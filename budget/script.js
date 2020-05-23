//budget controller
var budgetController = (function(){

  var Expense = function(id,description,value){
      this.id = id;
      this.description = description;
      this.value = value;
      this.percentage = -1;
  };

  Expense.prototype.calcPercentages = function(totalIncome){

      if(totalIncome > 0){
          this.percentage = Math.round((this.value/totalIncome)*100);
      }else{
          this.percentage =-1;
      }

  };

  Expense.prototype.getPercentage = function(){
        return this.percentage;
  };

  var Income = function(id,description,value){
      this.id = id;
      this.description = description;
      this.value = value;
  };



  var calculateTotal = function(type){
    var sum=0;
    data.allItems[type].forEach(function(curr){
      sum+=curr.value;
    });
    data.totals[type]=sum;
    /**/
  };


  var data = {
    allItems : {
        exp:[],
        inc:[]
    },
    totals : {
        exp:0,
        inc:0
    },
    budget :0,
    percentage : -1
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

      deleteItem : function(type,id){
        var ids,index;

        ids = data.allItems[type].map(function(current){
        //  console.log(current.id);
          return current.id;
        });

        index = ids.indexOf(id);

        if (index !== -1){
           data.allItems[type].splice(index,1);
        }

      },

      calculateBudget : function(){

        //calculate total income an expenses__list
        calculateTotal('exp');
        calculateTotal('inc');

        //calculate the budget: income - expenses
        data.budget = data.totals.inc - data.totals.exp;

        //calculate the percentage of income we spent
        if(data.totals.inc>0){
          data.percentage = Math.round((data.totals.exp/data.totals.inc)*100);
        }else{
          data.percentage=-1;
        }


      },

      calculatePercentages :function(){

          data.allItems.exp.forEach(function(cur){
            //console.log(cur);
            cur.calcPercentages(data.totals.inc);
          });
      },

      getPercentages : function(){
          var allPerc  = data.allItems.exp.map(function(curr){
              return curr.getPercentage();
          });
          return allPerc;
      },

      getBudget : function(){
        return {
          budget :data.budget,
          totalInc : data.totals.inc,
          totalExp : data.totals.exp,
          percentage : data.percentage
        }
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
    inputButton : '.add__btn',
    incomeContainer : '.income__list',
    expensesContainer : '.expenses__list',
    budgetLabel : '.budget__value',
    incomeLabel : '.budget__income--value',
    expensesLabel : '.budget__expenses--value',
    percentageLabel : '.budget__expenses--percentage',
    container : '.container',
    expensesPercLabel : '.item__percentage',
    dateLabel : '.budget__title--month'
  };

  var formatNumber = function(num,type){
      var numSplit,int,dec;
      /*
        + or - before number
        exactly 2 decimal points
        comma separting the thousands
      */

      num = Math.abs(num);
      num = num.toFixed(2);

      numSplit = num.split('.');

      int = numSplit[0];
      if(int.length > 3){
        int = int.substr(0,int.length-3)+','+int.substr(int.length-3,int.length);
        console.log(int);

      }

      dec = numSplit[1];

      return (type === 'exp' ? '-' : '+') + ' '+ int +'.'+ dec;

  };

  return {
    getinput : function(){
          return {
            type : document.querySelector(DOMstrings.inputType).value, //will get income or expense
            description : document.querySelector(DOMstrings.inputDescription).value,
            value : parseFloat(document.querySelector(DOMstrings.inputValue).value)
                }
              },
    addListItems:function(obj,type){
        var html,newHtml,element;

        //create HTML string placeholder text
        if(type === 'inc'){
          element = DOMstrings.incomeContainer;
          html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        }else if(type==='exp'){
          element = DOMstrings.expensesContainer;
          html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

        }

        //Replace the placeholder text with some acutal data
        newHtml = html.replace('%id%',obj.id);
        newHtml = newHtml.replace('%description%',obj.description);
        newHtml = newHtml.replace('%value%',formatNumber(obj.value,type));

        //Insert the HTML into the DOM
        document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
    },

    clearFields : function(){

        var fields,fieldsArr;
        fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

        fieldsArr = Array.prototype.slice.call(fields);

        fieldsArr.forEach(function(current,index,array){
                    current.value="";
        });
        fieldsArr[0].focus();
    },

    displayBudget : function(obj){
        var type;
        obj.budget > 0 ? type ='inc' : type ='exp';

        document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget,type);
        document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc,'inc');
        document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp,'exp');

        if(obj.percentage >0){
            document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage;
        }else {
          document.querySelector(DOMstrings.percentageLabel).textContent = '---';
        }
    },

    displayPercentages : function(percentages){

        var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);
        console.log(fields);

        var nodeListForEach = function(list,callback){
            for(var i=0; i<list.length; i++){
              callback(list[i],i);
              console.log(list[i]+' , '+i);
            }
        }

        nodeListForEach(fields,function(current,index){
            if(percentages[index]>0){
                current.textContent = percentages[index]+'%';
            }else {
              current.textContent = '---';
            }

        });

    },

    displayMonth : function(){
      var now, year,month,months;

      now = new Date();

      months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
      month = now.getMonth();

      year = now.getFullYear();
      document.querySelector(DOMstrings.dateLabel).textContent = months[month]+' '+year;

    },
    deleteListItem : function(selectorID){
      //  console.log(selectorID);
        var ele = document.getElementById(selectorID);
      //  console.log(ele);
        ele.parentNode.removeChild(ele);
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

     document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

  };

    var updateBudget = function(){

      //1.calcualte the budget
      budgetCtrl.calculateBudget();

      //2. Return the budget
      var budget = budgetCtrl.getBudget();

      //3. Display the budget on UI
      UICtrl.displayBudget(budget);
    }

    var updatePercentages = function(){

        //1. Calculate percentageLabel
        budgetCtrl.calculatePercentages();

        //2. Read percentages from budgetController
        var percentages = budgetCtrl.getPercentages();

        //3. Update the UI with new updatePercentages
        UICtrl.displayPercentages(percentages);

    }

    var ctrlAddItem = function(){
      var input,newItem;

      //1. Get the input values
      input = UICtrl.getinput();

      if(input.description !== "" && !isNaN(input.value) && input.value > 0){
        //2. add item to the budget__title
        newItem = budgetCtrl.addItem(input.type,input.description,input.value);

        //3. add item to the UI
        UICtrl.addListItems(newItem,input.type);

        //4. clearFields
        UICtrl.clearFields();

        //5. calcualte the budget__title
        updateBudget();

        //6. calculate && update new updatePercentages
        updatePercentages();

      }
    };

    var ctrlDeleteItem = function(event){
          var itemID,splitID,type,ID;

          itemID=(event.target.parentNode.parentNode.parentNode.parentNode.id);

          if(itemID){

              //inc-1
              splitID = itemID.split('-');
              type = splitID[0];
              ID= parseInt(splitID[1]);

              //1. Delete the item from Datastructure
              budgetCtrl.deleteItem(type,ID);

              //2. Delete from UI
              UICtrl.deleteListItem(itemID);

              //3 Update Budget and show new budget in UI
              updateBudget();

              //4. calculate && update new updatePercentages
              updatePercentages();
          }

    }

  return {
    init : function(){
      console.log('Application has started');
      UICtrl.displayMonth();
      UICtrl.displayBudget({
      budget :0,
      totalInc : 0,
      totalExp : 0,
      percentage : -1
      }
        );
      setupEventListeners();
    }
  };

})(budgetController,UIController);

Controller.init();
