/**
Nanme: Muhammad Muneeb
assignnment Seven javascript file
**/



 function printTable(minNumValueX, maxNumValueX, minNumValueY, maxNumValueY)
 {
     var table = document.createElement('table');
     table.id = 'table';
     var firstRow = true;
     var firstCol = true;

     var i = minNumValueY - 1;
     while(i <= maxNumValueY)
     {
       //creating row
         var tableRow = document.createElement('tr');

         var j = minNumValueX - 1;
         while(j <= maxNumValueX)
         {
             var cell;
             var cellText;
             if(firstRow)
             {
                 cell = document.createElement('th');
                 if(!firstCol)
                 {
                     cellText = document.createTextNode(j);
                     cell.appendChild(cellText);
                 }
             }
             else
             {
                 if(firstCol)
                 {
                     cell = document.createElement('th');
                     cellText = document.createTextNode(i);
                     cell.appendChild(cellText);
                 }
                 else
                 {
                     cell = document.createElement('td');
                     cellText = document.createTextNode(i * j);
                     cell.appendChild(cellText);
                 }
             }
             //Adding cell to a row
             tableRow.appendChild(cell);
             firstCol = false;
             j++;
         }
         // adding row to a table
         table.appendChild(tableRow);
         firstRow = false;
         firstCol = true;
         i++;
     }
     return table;
 }




 function appendReplaceHtmlElement(newHtmlElement, parentNode) {
    var oldHtmlElement;
    if((oldHtmlElement = document.getElementById(newHtmlElement.id)) &&
       oldHtmlElement.parentNode === parentNode) {

         // if id have elements replace it with the existing elemets
         // with same parent.
        parentNode.replaceChild(newHtmlElement, oldHtmlElement);
    } else {
        parentNode.appendChild(newHtmlElement);
    }
}

if (typeof formControler == "undefined") {

   /**
  * don't use namespace
  * controls the form namespave and and does different jobs for the page
  * @namespace  formControler
  */

    var formControler = (function()
    {
         // create event listner and trigger numbers entered in the form and
         // I ussed jQuery plugin for to check validation of the form data
        // if the data is valid submit them to draw the table by using printTable,
        // replaceElement() and formControler
        var inTheTable = function() {

            // jQuery addMethod to compare the validation
            jQuery.validator.addMethod(
                "compareTo",function(value, element, params)
                {
                var first_num = parseInt(value);
                var second_num = parseInt($('input[name="' + params[0] + '"]').val());

                // If first num or second num are NaN, they weren't parsable numbers.
                // if fist or second number is Nan than they are unparsable
                if(isNaN(first_num) || isNaN(second_num)) return true;

                if(params[2])
                {
                    return first_num <= second_num;
                }
                else
                {
                    return first_num >= second_num;
                }
            },'MAX value (1) must be >= Min (1) value.');

            $('form').validate(
              {
                // form input rules.
                rules: {
                  multiplierMin: {
                      required: true,
                      number:   true,
                      step:     1,
                      compareTo:    // should be <= maxNumX.
                          ['multiplierMax', 'multiplier', true]
                  },
                  multiplierMax: {
                      required: true,
                      number:   true,
                      step:     1,
                      compareTo:      // should be >= minNumX.
                          ['multiplierMin', 'multiplier', false]
                  },
                  multiplicandMin: {
                      required: true,
                      number:   true,
                      step:     1,
                      compareTo:      // should be <= maxNumY.
                          ['multiplicandMax', 'multiplicand', true]
                  },
                  multiplicandMax: {
                      required: true,
                      number:   true,
                      step:     1,
                      compareTo:      // should be >= minNumY.
                          ['multiplicandMin', 'multiplicand', false]
                  }
                },

                // error showing place
                showErrors: function(error, errorMap) {

                  var maxError = false;

                  // default error showing
                  this.defaultShowErrors();

                    // iterate to show error message
                    errorMap.forEach(function(error)
                    {
                        if(error.method === 'compareTo')
                        {
                            // see if the error is compareTo error
                            maxError = true;
                            $('#' + error.element.name + '-error').empty();
                            var errorType = error.element.name.slice(0, -3);
                            $('#' + errorType + 'Error').html(error.message);
                        }
                    });

                    if(errorMap.length === 0 || !maxError )
                    {
                        // if error is not there remove it
                        this.currentElements.each(function(index, element) {
                            var errorType = element.name.slice(0, -3);
                            $('#' + errorType + 'Error').empty();
                        });
                    }
                },

                // Error messages for all non-custom form restrictions.
                messages: {
                    multiplierMin: {
                        required: 'Cannot have empty value.',
                        number: 'Enter Only integer value.',
                        step: 'No Decimals Values only integer value allowed.'
                    },
                    multiplierMax: {
                      required: 'Cannot have empty value.',
                      number: 'Enter Only integer value.',
                      step: 'No Decimals Values only integer value allowed.'
                    },
                    multiplicandMin: {
                      required: 'Cannot have empty value.',
                      number: 'Enter Only integer value.',
                      step: 'No Decimals Values only integer value allowed.'
                    },
                    multiplicandMax: {
                      required: 'Cannot have empty value.',
                      number: 'Enter Only integer value.',
                      step: 'No Decimals Values only integer value allowed.'
                    }
                },

                // If validation passes, create the multiplication table.
                submitHandler: function(form, event) {
                    event.preventDefault();

                    var table = printTable(
                    form.elements['multiplierMin'].value,
                    form.elements['multiplierMax'].value,
                    form.elements['multiplicandMin'].value,
                    form.elements['multiplicandMax'].value);
                      appendReplaceHtmlElement(table, form);
                }

            });
        }

        return {
            inTheTable: inTheTable
        };
    })();

    // when document is loaded add javascript
    document.addEventListener('DOMContentLoaded', formControler.inTheTable);
};
