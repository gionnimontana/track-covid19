

export const measure = ($) => {
    var labelToSymbol = {
        'done': 'O',
        'not-yet': 'X',
        'not-applic': 'N.A.',
        'empty': ''
    }

    $.ajax({
        url: "./data/checklist-processing-data.json",
        success: function (result) {
            var generationTime = new Date(result.timestamp)
            $("#checklist-timestamp").text(generationTime.toLocaleString());
            $("#checklist-filename").text(result.filename);
        }
    });

    $.ajax({
        url: "./data/checkList.json",
        success: function (result) {
            var totalCategories = 0;

            var itemCategory = ""
            result.ResponseItems.forEach(item => {
                if (itemCategory !== item.itemCategory) {
                    $("#measure-header").append($("<th>" + item.itemCategory + "</th>"));
                    itemCategory = item.itemCategory;
                    totalCategories++;
                }
            });

            var nation = ""
            result.Companies.forEach(company => {
                if (nation !== company.nation) {
                    $("#measure").append($("<tr class='item-category'><td colspan='" + (totalCategories + 1) + "'>" + company.nation + "</td></tr>"));
                    nation = company.nation;
                }
                $("#measure").append($("<tr class='item-subcategory'><td>" + company.companyName + "</td></tr>"));
            })

            result.CompaniesResponses.forEach((item, companyCounter) => {
                var companyID = item.companyID;
                var category = "";
                var done = 0; //done
                var notJet = 0; //not-yet

                item.itemValues.forEach((itemValue, itemCounter) => {

                    var thisCategory = result.ResponseItems[itemValue.itemID].itemCategory;
                    if (category === "") {
                        category = thisCategory;
                    }

                    if (category !== thisCategory) {
                        var total = done + notJet;
                        if (total > 0) {
                            var measure = parseInt(done / total * 10000) / 100.0
                            var colorClass = "green";
                            if (measure < 50) {
                                colorClass = 'red';
                            }
                            else if (measure < 100) {
                                colorClass = 'yellow';
                            }
                            // $($("#measure").find("tr.item-subcategory")[companyCounter]).append("<td class='" + colorClass + "'>" + parseInt(done / total * 10000) / 100.0 + "%</td>")
                            $($("#measure").find("tr.item-subcategory")[companyCounter]).append("<td class='" + colorClass + "'></td>")
                        }
                        else {
                            $($("#measure").find("tr.item-subcategory")[companyCounter]).append("<td class='gray'></td>")
                        }
                        category = thisCategory;
                        done = 0;
                        notJet = 0;
                    }


                    if (itemValue.itemValue === "done") {
                        done++;
                    }
                    else if (itemValue.itemValue === "not-yet") {
                        notJet++;
                    }
                });
                {
                    var total = done + notJet;
                    if (total > 0) {
                        var measure = parseInt(done / total * 10000) / 100.0
                        var colorClass = "green";
                        if (measure < 50) {
                            colorClass = 'red';
                        }
                        else if (measure < 100) {
                            colorClass = 'yellow';
                        }
                        $($("#measure").find("tr.item-subcategory")[companyCounter]).append("<td class='" + colorClass + "'></td>")
                        //$($("#measure").find("tr.item-subcategory")[companyCounter]).append("<td class='" + colorClass + "'>" + parseInt(done / total * 10000) / 100.0 + "%</td>")
                    }
                    else {
                        $($("#measure").find("tr.item-subcategory")[companyCounter]).append("<td >-</td>")
                    }
                }

            });
        }
    });

}
