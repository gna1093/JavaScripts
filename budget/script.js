//budget controller
var budgetController = (function(){

  var Expense = function(id,description,value){
      this.id = id;
      this.description = description;
      this.value = value;
  };

  var Income = function(id,description,value){
      this.id = id;
      this.description = description;
      this.value = value;
  };

  var data = {
    allItems : {
        exp:[],
        inc:[]
    },
    totals : {
        exp:0,
        inc:0
    }
  };

  return{
      addItem : function(type,des,val){
          var newItem, ID;
          //creating new ID
          if(data.allItems[type].length>0){
            ID=data.allItems[type][data.allItems[type].length-1].id + 1;
          }else{
            ID=0;
          }


          //Create new item based on inc or exp type
          if(type === 'exp'){
            newItem = new Expense(ID,des,val);
          }else if(type === 'inc'){
            newItem = new Income(ID,des,val);
          }

          //push it into our data
          data.allItems[type].push(newItem);

          //Return the new element
          return newItem;
      },
      testing:function(){
        console.log(data);
      }
  };
})();


//UI controller
var UIController = (function(){

  var DOMstrings = {
    inputType : '.add__type',
    inputDescription : '.add__description',
    inputValue : '.add__value',
    inputButton : '.add__btn'
  };

  return {
    getinput : function(){
          return {
            type : document.querySelector(DOMstrings.inputType).value, //will get income or expense
            description : document.querySelector(DOMstrings.inputDescription).value,
            value : document.querySelector(DOMstrings.inputValue).value
                }
              },
    addListItems:function(obj,type){
        var html;

        //create HTML string placeholder text
        if(type === 'inc'){
          html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        }else if(type==='exp'){
          html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

        }

        //Replace the placeholder text with some acutal data

        //Insert the HTML into the DOM

    },
    getDOMstrings : function(){
      return DOMstrings;
          }
        };

})();

var Controller = (function(budgetCtrl,UICtrl){

    var setupEventListeners = function(){

      var DOM = UICtrl.getDOMstrings();

      document.querySelector(DOM.inputButton).addEventListener('click',ctrlAddItem);
      document.addEventListener('keypress',function(event){
          if(event.keyCode === 13 || event.which ===13){
                ctrlAddItem();
          }
    });
  };


    var ctrlAddItem = function(){
      var input,newItem;

      //1. Get the input values
      input = UICtrl.getinput();

      //2. add item to the budget__title
      newItem = budgetCtrl.addItem(input.type,input.description,input.value);

      //3. add item to the UI

      //4. calcualte the budget__title

      //5. Display
      console.log('Its works');
    };



  return {
    init : function(){
      console.log('Application has started');
      setupEventListeners();
    }
  };

})(budgetController,UIController);

Controller.init();
