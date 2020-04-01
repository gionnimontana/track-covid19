class CovidMap 
{
    constructor ()
    {
        var bottom_left_corner = L.latLng(35, -11);
        var top_right_corner = L.latLng(61, 40);
        var bounds = L.latLngBounds(bottom_left_corner, top_right_corner);

        var map = L.map('mapid').fitBounds(bounds);

        L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
            attribution: ''
        }).addTo(map);

        this.map = map;

        this.additional_layers = [];

        this.coordinates_map = null;

        this.data_points = null;

        this.ZERO_VALUE_IS_SPECIAL = false;

        this.VALUE_SCALING_COEFFICIENT = 1.0;

        //console.log("Created CovidMap");
    }

    clear_additional_layers() 
    {
        //console.log("Clearing layers");
        for (const layer of this.additional_layers)
        {
            this.map.removeLayer(layer);
        }
        this.additional_layers = [];
    }

    add_layer(layer)
    {
        layer.addTo(this.map);
        this.additional_layers.push(layer);
    }

    get_color_from_circle_type(circle_type)
    {
        switch(circle_type) {
            case "people_factory":
                return "#0066B3";
            case "people_home":
                return "#0A005A";
            case "people_vacation":
                return "#67CA9D";
            case "people_off":
                return "#8884D8";
            case "people_quarantine":
                return "#53565A";
            case "people_sick":
                return "#ED1C24";
            case "people_infected":
                return "#000000";
          } 
    }

    calculate_radius_from_value(value)
    {
        if (value == 0 && this.ZERO_VALUE_IS_SPECIAL == true)
        {
            return 0;
        }
        return this.VALUE_SCALING_COEFFICIENT * Math.sqrt(value);
    }

    create_popup_table(name, all_values)
    {
        var table = document.createElement("TABLE");
        var row = null;
        var cell_left = null;
        var cell_right = null;
        
        row = table.insertRow();
        cell_left = row.insertCell(0);
        cell_right = row.insertCell(1);
        cell_left.innerHTML = name;
        cell_left.style["font-size"] = "15px";
        cell_left.style["font-weight"] = "bold";
        cell_right.innerHTML = "";
        cell_right.style["text-align"] = "right";

        row = table.insertRow();
        cell_left = row.insertCell(0);
        cell_right = row.insertCell(1);

        row = table.insertRow();
        cell_left = row.insertCell(0);
        cell_right = row.insertCell(1);
        cell_left.innerHTML = "People in the factory";
        cell_right.innerHTML = all_values["people_factory"];
        cell_right.style["text-align"] = "right";

        row = table.insertRow();
        cell_left = row.insertCell(0);
        cell_right = row.insertCell(1);
        cell_left.innerHTML = "People at home office";
        cell_right.innerHTML = all_values["people_home"];
        cell_right.style["text-align"] = "right";

        row = table.insertRow();
        cell_left = row.insertCell(0);
        cell_right = row.insertCell(1);
        cell_left.innerHTML = "People on vacation";
        cell_right.innerHTML = all_values["people_vacation"];
        cell_right.style["text-align"] = "right";

        row = table.insertRow();
        cell_left = row.insertCell(0);
        cell_right = row.insertCell(1);
        cell_left.innerHTML = "People on temporary layoff";
        cell_right.innerHTML = all_values["people_off"];
        cell_right.style["text-align"] = "right";

        row = table.insertRow();
        cell_left = row.insertCell(0);
        cell_right = row.insertCell(1);
        cell_left.innerHTML = "People in quarantine";
        cell_right.innerHTML = all_values["people_quarantine"];
        cell_right.style["text-align"] = "right";

        row = table.insertRow();
        cell_left = row.insertCell(0);
        cell_right = row.insertCell(1);
        cell_left.innerHTML = "People on sick leave";
        cell_right.innerHTML = all_values["people_sick"];
        cell_right.style["text-align"] = "right";

        row = table.insertRow();
        cell_left = row.insertCell(0);
        cell_right = row.insertCell(1);
        cell_left.innerHTML = "People infected by COVID-19";
        cell_right.innerHTML = all_values["people_infected"];
        cell_right.style["text-align"] = "right";

        return table.outerHTML;
    }

    add_marker(lat, lon, company_name, value, marker_type, all_values)
    {
        var marker_pos = L.latLng(lat, lon);
        var radius = this.calculate_radius_from_value(value);
        var color = this.get_color_from_circle_type(marker_type);
        var circle = L.circleMarker(marker_pos, {
            stroke: true,
            color: color,
            fillColor: color,
            fillOpacity: 0.5,
            radius: radius
        });
        this.add_layer(circle);

        var div_company_text = document.createElement("div");
        div_company_text.className = "circle_text circle_text_top";
        div_company_text.innerHTML = company_name;

        var div_value_text = document.createElement("div");
        div_value_text.className = "circle_text circle_text_bottom";
        div_value_text.innerHTML = value;
        div_value_text.style["transform"] = "translateX(-50%) translateX(6px) translateY(" + (-radius - 15) + "px)";
        
        var myIcon = L.divIcon({className: 'my-div-icon', html: div_value_text});
        var marker_value_text = L.marker(marker_pos, {icon: myIcon});

        var marker_to_bind_popup = circle;

        this.add_layer(circle);
        if (value > 0 || this.ZERO_VALUE_IS_SPECIAL == false)
        {
            this.add_layer(marker_value_text);
            marker_to_bind_popup = marker_value_text;
        }
        var table = this.create_popup_table(company_name, all_values);
        marker_to_bind_popup.bindPopup(table, {closeButton: false});
        marker_to_bind_popup.on('mouseover', function(event){
            marker_to_bind_popup.openPopup();
        });
        marker_to_bind_popup.on('mouseout', function(event){
            marker_to_bind_popup.closePopup();
        });
    }

    update_map()
    {
        //console.log("Updating map");
        var filter_by_geo = get_filter_by_geo();
        var filter_by_type = get_filter_by_employee();
        //console.log(filter_by_type, filter_by_geo);

        var list_of_companies = this.data_points[filter_by_geo];

        this.clear_additional_layers();

        for (const company of list_of_companies)
        {
            //console.log(company);
            if (filter_by_geo == "companies")
            {
                var name = company["company"];
                var lat = this.coordinates_map["companies"][name]["lat"];
                var lon = this.coordinates_map["companies"][name]["lon"];
            }
            else
            {
                var name = company["country"];
                //console.log(name);
                var lat = this.coordinates_map["countries"][name]["lat"];
                var lon = this.coordinates_map["countries"][name]["lon"];
            }
            
            //console.log(company);
            var all_values = company["absData"];
            var value = all_values[filter_by_type];
            
            //console.log(lat, lon, name, value);
            this.add_marker(lat, lon, name, value, filter_by_type, all_values);
        }
    }
};