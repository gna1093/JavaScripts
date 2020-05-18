//budget controller
var budgetController = (function(){

  //some code

})();


//UI controller
var UIController = (function(){

  var DOMstrings = {
    inputType : '.add_type',
    inputDescription : '.add__description',
    inputValue : '.add__value'
  }

  return {
    getinput : function(){

      return {
        type : document.querySelector(DOMstrings.inputType).value, //will get income or expense
        description : document.querySelector(DOMstrings.inputDescription).value,
        value : document.querySelector(DOMstrings.inputType).value
            }
    }
  }

})();

var Controller = (function(budgetCtrl,UICtrl){



    var ctrlAddItem = function(){
      var input = UICtrl.getinput();
      console.log(input);

      //2. add item to the budget__title

      //3. add item to the UI

      //4. calcualte the budget__title

      //5. Display
      console.log('Its works');
    }

    document.querySelector('.add__btn').addEventListener('click',ctrlAddItem);
    document.addEventListener('keypress',function(event){
        if(event.keyCode === 13 || event.which ===13){
            console.log('ENTER pressed');
            ctrlAddItem();
        }

    });

})(budgetController,UIController);
