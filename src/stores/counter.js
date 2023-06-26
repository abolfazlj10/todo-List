import { registerRuntimeHelpers } from '@vue/compiler-core'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
  id: 'Todo',
  
  state: () => ({
    tasks:[],
    tasksactive:[],
    tasksComputed:[],
    tasksArchive:[],
    IndexReturnArchive:[],
    mode: 'All',
    Them : 'Light',
    ShowModalTask : false,
    Title : "",
    Description : "" , 
    newObj : null ,
    lastIndexEdit : null , 
    IsCheckTasksNote : false,
    erorrVacantTitle : false ,
    CounterLenghtMode : 0,
    SortAddTasks : 1 ,
    lastDateTasks : null ,
    showDateAddNewTasks : false,
    colorTask : null,
    codeTask : 0 ,
    colorDefualt : {color: '#4fc08d'},
    tagArry : ['school' , 'shopping'],
    NewTagSTR : '',
    newOption: 'none',
    resultTag : null ,
    typeChange: null ,
    arryShowTags: [],
    ItemSelectedTag : 'All' ,
  }),
  actions: {
    IsShowModalTask (){
      this.colorTask = null
      if (this.ShowModalTask){
        this.ShowModalTask = false 
        this.showDateAddNewTasks = false
        this.Title = null
        this.Description = null
        this.newOption = 'none'
        this.GetCodeTasks('get')
      }else {
        this.ShowModalTask = true
      }
      this.SortAddTasks = 1
    },
    TimeDate (){
      var HouesTime , MinutesTime
      setInterval(function () {
        var DatePagesHome = document.getElementById('Date')
        var DatePagesEdit = document.getElementById('dateADdTask')
        const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
        const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        var time = new Date()
        HouesTime = time.getHours()
        MinutesTime = time.getMinutes()
        if (MinutesTime <= 9){
          MinutesTime = '0' + time.getMinutes()
        }else {
          MinutesTime = time.getMinutes()
        }
        DatePagesHome.innerHTML = HouesTime + ':' + MinutesTime + '     -     ' + days[time.getDay()] + '   ' + time.getDate() + '   ' + months[time.getMonth()] + '  ' + time.getFullYear()
        DatePagesEdit.innerHTML = HouesTime + ':' + MinutesTime + '     -     ' + days[time.getDay()] + '   ' + time.getDate() + '   ' + months[time.getMonth()]
      } , 1000)
    },
    lastDateSubmitTasks (){
      var  HouesTime , MinutesTime
      const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
      const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      var time = new Date()
      HouesTime = time.getHours()
      MinutesTime = time.getMinutes()
      
      if (MinutesTime <= 9){
        MinutesTime = '0' + time.getMinutes()
      }else {
        MinutesTime = time.getMinutes()
      }
      this.lastDateTasks = HouesTime + ':' + MinutesTime  + '  -  ' + days[time.getDay()] +  '   ' + time.getDate() + '   ' + months[time.getMonth()] 
      
    },
    AddNewTask (){ 
      this.showDateAddNewTasks = false
      var IsArchive = false
      if (this.Title == ""){
        this.erorrVacantTitle = true
        setTimeout(() => {
          this.erorrVacantTitle = false 
        }, 2000);
      }else {
        var testsome = this.tasks.some((elem) => {
          if (this.codeTask == elem.code){
            if (elem.Status == true){
              this.IsCheckTasksNote = true
            }else {
              this.IsCheckTasksNote = false 
            }
            if (elem.Archive){
              IsArchive = true
            }
            return this.codeTask == elem.code
          }
        })

      if (this.NewTagSTR != '' && this.newOption == 'none'){
        this.resultTag = this.NewTagSTR
        this.tagArry.push(this.resultTag)
        localStorage.setItem('TagTaskTodoList' , JSON.stringify(this.tagArry))
      }else if (this.NewTagSTR == '' && this.newOption != 'none'){
        this.resultTag = this.newOption
      }else if (this.newOption == 'none' && this.NewTagSTR == ''){
        this.resultTag = 'none'
      }else {
        alert('')
      }
      
      
      if (testsome){
        
        if (IsArchive){
          if (this.IsCheckTasksNote){
            this.newObj = {
              title : this.Title,
                description : this.Description,
                sort : this.SortAddTasks ,
                Status : true ,
                Archive : true ,
                DateSubmit : this.lastDateTasks,
                color : this.colorTask,
                code : this.codeTask,
                tag : this.editTagTasks()
                
              }
            }else {
              this.newObj = {
                title : this.Title,
                description : this.Description,
                sort : this.SortAddTasks ,
                Status : false ,
                Archive : true ,
                DateSubmit : this.lastDateTasks,
                color : this.colorTask,
                code : this.codeTask,
                tag : this.editTagTasks()
              }
            }

          }else {
            
            if (this.IsCheckTasksNote){
              this.newObj = {
                title : this.Title,
                description : this.Description,
                sort : this.SortAddTasks ,
                Status : true ,
                Archive : false ,
                DateSubmit : this.lastDateTasks,
                color : this.colorTask,
                code : this.codeTask,
                tag : this.editTagTasks()
              }
            }else {
              this.newObj = {
                title : this.Title,
                description : this.Description,
                sort : this.SortAddTasks ,
                Status : false ,
                Archive : false ,
                DateSubmit : this.lastDateTasks,
                color : this.colorTask,
                code : this.codeTask,
                tag : this.editTagTasks()
              }
            }
          }
          this.Title = ""
          this.Description = ""
          this.SortAddTasks = 1
          var titleIndex , indextasksSort , indexnarryshow
            if (this.mode == 'All'){

              if (this.ItemSelectedTag == 'All'){
                titleIndex = this.tasks[this.lastIndexEdit].code
                
                indextasksSort = this.arryShowTags.findIndex(item => {
                  return item.code == titleIndex
                })

                this.tasks.splice(this.lastIndexEdit , 1 , this.newObj)
                this.arryShowTags.splice(indextasksSort , 1 , this.newObj)
              }else {
                titleIndex = this.arryShowTags[this.lastIndexEdit].code
  
                indextasksSort = this.tasks.findIndex(item => {
                  return item.code == titleIndex
                })
                this.arryShowTags.splice(this.lastIndexEdit , 1 , this.newObj)
                this.tasks.splice(indextasksSort , 1 , this.newObj)
              }

            }else if (this.mode == 'active'){
              if (this.ItemSelectedTag == 'All'){
                titleIndex = this.tasksactive[this.lastIndexEdit].code
                indextasksSort = this.tasks.findIndex((item) => {
                  return item.code == titleIndex
                })
                indexnarryshow = this.arryShowTags.findIndex(item => {
                  return item.code = titleIndex
                })
                
                this.arryShowTags.splice(indexnarryshow , 1 , this.newObj)
                this.tasks.splice(indextasksSort , 1 , this.newObj)
              }else {                
                titleIndex = this.arryShowTags[this.lastIndexEdit].code
                
                indextasksSort = this.tasks.findIndex((item) => {
                  return item.code == titleIndex
                })
                
                this.arryShowTags.splice(this.lastIndexEdit , 1 , this.newObj)
                this.tasks.splice(indextasksSort , 1 , this.newObj)

              }
              
            }else if (this.mode == 'Computed'){
              if (this.ItemSelectedTag == 'All'){
                titleIndex = this.tasksComputed[this.lastIndexEdit].code
                indextasksSort = this.tasks.findIndex((item) => {
                  return item.code == titleIndex
                })
                indexnarryshow = this.arryShowTags.findIndex((item) => {
                  return item.code == titleIndex
                })
                
                this.tasks.splice(indextasksSort , 1 , this.newObj)
                this.arryShowTags.splice(indexnarryshow , 1 , this.newObj)
              }else {
                titleIndex = this.arryShowTags[this.lastIndexEdit].code
                
                indextasksSort = this.tasks.findIndex((item) => {
                  return item.code == titleIndex
                })
                
                this.arryShowTags.splice(this.lastIndexEdit , 1 , this.newObj)
                this.tasks.splice(indextasksSort , 1 , this.newObj)
              }
  
              
            }else {
              if (this.ItemSelectedTag == 'All'){
                titleIndex = this.tasksArchive[this.lastIndexEdit].code
                indextasksSort = this.tasks.findIndex((item) => {
                  return item.code == titleIndex
                })
                indexnarryshow = this.arryShowTags.findIndex((item) => {
                  return item.code == titleIndex
                })
                
                this.tasks.splice(indextasksSort , 1 , this.newObj)
                this.arryShowTags.splice(indexnarryshow , 1 , this.newObj)
              }else {
                titleIndex = this.arryShowTags[this.lastIndexEdit].code
                
                indextasksSort = this.tasks.findIndex((item) => {
                  return item.code == titleIndex
                })
                
                this.arryShowTags.splice(this.lastIndexEdit , 1 , this.newObj)
                this.tasks.splice(indextasksSort , 1 , this.newObj)
              }
              
              
              
            }

          this.ShowModalTask = false
          this.colorTask = null

          
        }else {
          this.lastDateSubmitTasks()
          if (this.mode == 'Archive'){            
            this.newObj = {
              title : this.Title,
              description : this.Description,
              sort : this.SortAddTasks ,
              Status : false ,
              Archive : true ,
              DateSubmit : this.lastDateTasks,
              color : this.colorTask , 
              code : this.codeTask,
              tag : this.resultTag,
              
            }
          }else {
            this.newObj = {
              title : this.Title,
              description : this.Description,
              sort : this.SortAddTasks ,
              Status : false ,
              Archive : false ,
              DateSubmit : this.lastDateTasks,
              color : this.colorTask , 
              code : this.codeTask,
              tag : this.resultTag,
              
            }
          }
          this.Title = "" 
          this.Description = ""
          this.SortAddTasks = 1 
          this.tasks.unshift(this.newObj)
          this.ShowModalTask = false
          
          this.colorTask = null

          
        }
        
      }
      this.FilterArr()
      this.SelectOptionSelectvav()
      this.taskCounterNumber()
      if (this.mode == 'All' || this.mode == 'active'){
        if (this.resultTag == this.ItemSelectedTag && this.CounterLenghtMode == 0){
          this.CounterLenghtMode++
        }
      }
      this.codeTask++
      this.SortChanges()
      this.saveToDrive()
      this.GetCodeTasks('save')
      this.newOption = 'none'
      this.resultTag = 'none'
      this.NewTagSTR = ''
    },
    EditTask ( event ){
      this.showDateAddNewTasks = true
      this.ShowModalTask = true

      var IndexTasks = event.target.parentElement.parentElement.getAttribute("data-indexArry")

      if (event.target.tagName == 'SPAN' || event.target.tagName == 'DEL'){
        this.lastIndexEdit = event.target.getAttribute('data-Index')
      }else {
        this.lastIndexEdit = event.target.getAttribute('data-Index')
      }
      


      if (this.mode == 'All'){
        if (this.ItemSelectedTag == 'All'){
          this.Title = this.tasks[IndexTasks].title
          this.Description = this.tasks[IndexTasks].description
          this.SortAddTasks = this.tasks[IndexTasks].sort
          this.lastDateTasks = this.tasks[IndexTasks].DateSubmit
          this.colorTask = this.tasks[IndexTasks].color
          this.codeTask = this.tasks[IndexTasks].code
          this.newOption = this.tasks[IndexTasks].tag
        }else {
          this.Title = this.arryShowTags[IndexTasks].title
          this.Description = this.arryShowTags[IndexTasks].description
          this.SortAddTasks = this.arryShowTags[IndexTasks].sort
          this.lastDateTasks = this.arryShowTags[IndexTasks].DateSubmit
          this.colorTask = this.arryShowTags[IndexTasks].color
          this.codeTask = this.arryShowTags[IndexTasks].code
          this.newOption = this.arryShowTags[IndexTasks].tag
        }

        
      }else if (this.mode == 'active'){

        if (this.ItemSelectedTag == 'All'){
          this.Title = this.tasksactive[IndexTasks].title
          this.Description = this.tasksactive[IndexTasks].description
          this.SortAddTasks = this.tasksactive[IndexTasks].sort
          this.lastDateTasks = this.tasksactive[IndexTasks].DateSubmit
          this.colorTask = this.tasksactive[IndexTasks].color
          this.codeTask = this.tasksactive[IndexTasks].code
          this.newOption = this.tasksactive[IndexTasks].tag
        }else {
          this.Title = this.arryShowTags[IndexTasks].title
          this.Description = this.arryShowTags[IndexTasks].description
          this.SortAddTasks = this.arryShowTags[IndexTasks].sort
          this.lastDateTasks = this.arryShowTags[IndexTasks].DateSubmit
          this.colorTask = this.arryShowTags[IndexTasks].color
          this.codeTask = this.arryShowTags[IndexTasks].code
          this.newOption = this.arryShowTags[IndexTasks].tag

        }


        
        
      }else if (this.mode == 'Computed'){

        if (this.ItemSelectedTag == 'All'){
          this.Title = this.tasksComputed[IndexTasks].title
          this.Description = this.tasksComputed[IndexTasks].description
          this.SortAddTasks = this.tasksComputed[IndexTasks].sort
          this.lastDateTasks = this.tasksComputed[IndexTasks].DateSubmit
          this.colorTask = this.tasksComputed[IndexTasks].color
          this.codeTask = this.tasksComputed[IndexTasks].code
          this.newOption = this.tasksComputed[IndexTasks].tag
        }else {
          this.Title = this.arryShowTags[IndexTasks].title
          this.Description = this.arryShowTags[IndexTasks].description
          this.SortAddTasks = this.arryShowTags[IndexTasks].sort
          this.lastDateTasks = this.arryShowTags[IndexTasks].DateSubmit
          this.colorTask = this.arryShowTags[IndexTasks].color
          this.codeTask = this.arryShowTags[IndexTasks].code
          this.newOption = this.arryShowTags[IndexTasks].tag

        }

        
        
      }else {
        if (this.ItemSelectedTag == 'All'){
          this.Title = this.tasksArchive[IndexTasks].title
          this.Description = this.tasksArchive[IndexTasks].description
          this.SortAddTasks = this.tasksArchive[IndexTasks].sort
          this.lastDateTasks = this.tasksArchive[IndexTasks].DateSubmit
          this.colorTask = this.tasksArchive[IndexTasks].color
          this.codeTask = this.tasksArchive[IndexTasks].code
          this.newOption = this.tasksArchive[IndexTasks].tag
        }else {
          this.Title = this.arryShowTags[IndexTasks].title
          this.Description = this.arryShowTags[IndexTasks].description
          this.SortAddTasks = this.arryShowTags[IndexTasks].sort
          this.lastDateTasks = this.arryShowTags[IndexTasks].DateSubmit
          this.colorTask = this.arryShowTags[IndexTasks].color
          this.codeTask = this.arryShowTags[IndexTasks].code
          this.newOption = this.arryShowTags[IndexTasks].tag
        }
        
        
      }
      this.saveToDrive()
    },
    RemoveTasks (event){
      var IndexTasks = event.target.parentElement.parentElement.getAttribute("data-indexArry")

      if (this.mode == 'All'){

        if (this.ItemSelectedTag == 'All'){
          var titleIndex = this.tasks[IndexTasks].code
          if (this.tasks[IndexTasks].Status == true){
            var searchIndex = this.tasksComputed.findIndex((item) => {
              return item.code == titleIndex
            })
            this.tasksComputed.splice(searchIndex , 1)
          }else {
            var searchIndex = this.tasksactive.findIndex((item) => {
              return item.code == titleIndex
            })
            this.tasksactive.splice(searchIndex , 1)
          }
          this.tasks.splice(IndexTasks , 1)
        }else {
          var titleIndex = this.arryShowTags[IndexTasks].code
          var searchIndex = this.tasks.findIndex((item) => {
            return item.code == titleIndex
          })
          this.arryShowTags.splice(IndexTasks , 1)
          this.tasks.splice(searchIndex , 1)
        }


      }else if (this.mode == 'active'){
        if (this.ItemSelectedTag == 'All'){
        var titleIndex = this.tasksactive[IndexTasks].code
        
        var searchIndex = this.tasks.findIndex((item) => {
          return item.code == titleIndex
        })

        this.tasks.splice(searchIndex , 1)
        this.tasksactive.splice(IndexTasks , 1 )
        }else {
          var titleIndex = this.arryShowTags[IndexTasks].code
          var searchIndex = this.tasksactive.findIndex(Item => {
            return Item.code == titleIndex
          })
          var searchIndexTasks = this.tasks.findIndex(Item => {
            return Item.code == titleIndex
          })
          this.tasks.splice(searchIndexTasks , 1)
          this.arryShowTags.splice(IndexTasks , 1)
          this.tasksactive.splice(searchIndex , 1)

        }


      }else if (this.mode == 'Computed'){
        if (this.ItemSelectedTag == 'All'){
        var titleIndex = this.tasksComputed[IndexTasks].code
        
        var searchIndex = this.tasks.findIndex((item) => {
          return item.code == titleIndex
        })

        this.tasks.splice(searchIndex , 1)
        this.tasksComputed.splice(IndexTasks , 1 )
        }else {
          var titleIndex = this.arryShowTags[IndexTasks].code
          var searchIndex = this.tasksactive.findIndex(Item => {
            return Item.code == titleIndex
          })
          var searchIndexTasks = this.tasks.findIndex(Item => {
            return Item.code == titleIndex
          })
          this.tasks.splice(searchIndexTasks , 1)
          this.arryShowTags.splice(IndexTasks , 1)
          this.tasksactive.splice(searchIndex , 1)

        }
        

      }else {
        if (this.ItemSelectedTag == 'All'){
        var titleIndex = this.tasksArchive[IndexTasks].code
        
        var searchIndex = this.tasks.findIndex((item) => {
          return item.code == titleIndex
        })

        this.tasks.splice(searchIndex , 1)
        this.tasksArchive.splice(IndexTasks , 1 )
        }else {
          var titleIndex = this.arryShowTags[IndexTasks].code
          var searchIndex = this.tasksactive.findIndex(Item => {
            return Item.code == titleIndex
          })
          var searchIndexTasks = this.tasks.findIndex(Item => {
            return Item.code == titleIndex
          })
          this.tasks.splice(searchIndexTasks , 1)
          this.arryShowTags.splice(IndexTasks , 1)
          this.tasksactive.splice(searchIndex , 1)

        }

      }
      this.CounterLenghtMode--
      this.saveToDrive()
    },
    ChekcTickTask (){
      var IndexTasks = event.target.parentElement.parentElement.getAttribute("data-indexArry")

      if (this.mode == 'All'){

        if (this.ItemSelectedTag == 'All'){
          
          if (this.tasks[IndexTasks].Status){
              this.tasks[IndexTasks].Status = false 
            }else {
                this.tasks[IndexTasks].Status = true
              }
        }else {
          
          if (this.arryShowTags[IndexTasks].Status){
            this.arryShowTags[IndexTasks].Status = false
          }else {
            this.arryShowTags[IndexTasks].Status = true
          }
        }


      }else if (this.mode == 'active'){
        if (this.ItemSelectedTag == 'All'){
      if (this.tasksactive[IndexTasks].Status){
        this.tasksactive[IndexTasks].Status = false 
      }else {
        this.tasksactive[IndexTasks].Status = true
      }
      this.CounterLenghtMode--
        }else {
          if (this.arryShowTags[IndexTasks].Status){
            this.arryShowTags[IndexTasks].Status = false
          }else {
            this.arryShowTags[IndexTasks].Status = true
          }
        }




      }else if (this.mode == 'Computed'){
        if (this.ItemSelectedTag == 'All'){
        if (this.tasksComputed[IndexTasks].Status){
          this.tasksComputed[IndexTasks].Status = false 
        }else {
          this.tasksComputed[IndexTasks].Status = true
        }
        this.CounterLenghtMode--
        }else {
          if (this.arryShowTags[IndexTasks].Status){
            this.arryShowTags[IndexTasks].Status = false
          }else {
            this.arryShowTags[IndexTasks].Status = true
          }
        }



      }else {
        if (this.ItemSelectedTag == 'All'){
        if (this.tasksArchive[IndexTasks].Status){
          this.tasksArchive[IndexTasks].Status = false 
        }else {
          this.tasksArchive[IndexTasks].Status = true
        }
        }else {
          if (this.arryShowTags[IndexTasks].Status){
            this.arryShowTags[IndexTasks].Status = false
          }else {
            this.arryShowTags[IndexTasks].Status = true
          }
        }


      }
      this.FilterArr()
      this.SelectOptionSelectvav()
      this.taskCounterNumber()
      this.SortChanges()
      this.saveToDrive()

    },
    PageLoadInforamtion (){
      let ishistorilocal = JSON.parse(localStorage.getItem('Tasks'))
      var IsTagArry = JSON.parse(localStorage.getItem('TagTaskTodoList'))
      var IsLocalThem = localStorage.getItem('ThemTodoList')
      var IsCode = localStorage.getItem('CodeSubmitTasks')
      if (ishistorilocal)    {
        this.tasks = ishistorilocal
      }else{
        this.tasks = []
      }
      this.FilterArr()
      if (IsLocalThem != null){
        this.Them = IsLocalThem
      }
      if (IsCode != null){
        this.codeTask = IsCode
      }
      if (IsTagArry != null){
        this.tagArry = IsTagArry
      }
    },
    saveToDrive (){
      localStorage.setItem('Tasks' , JSON.stringify(this.tasks))
      localStorage.setItem('ThemTodoList' , this.Them)
    },
    GetCodeTasks (Status){
      if (Status == 'get'){
        var IsCode = localStorage.getItem('CodeSubmitTasks')
        if (IsCode != null){
          this.codeTask = IsCode
        }
      }else {
        localStorage.setItem('CodeSubmitTasks' , this.codeTask)
      }
    },
    FilterArr (){
      this.tasksArchive = this.tasks.filter((item) => {
        if (item.Archive){
          return item
        }
      })
      this.tasksComputed = this.tasks.filter((Item) => {
        if (Item.Status == true){
          return Item
        }
      })
      this.tasksactive = this.tasks.filter((Item) => {
        if (Item.Status == false){
          return Item
        }
      })
        
      
    },
    EmpetyArry (){
      if (this.mode == 'All'){
        this.tasks = this.tasks.filter(item => {
          return item.Archive == true
        })
        this.tasksactive = []
        this.tasksComputed = []
        this.codeTask = 0 
      }else if (this.mode == 'active'){

        this.tasks =this.tasks.filter((Item) => {

            return Item.Status == true
        })

        this.tasksactive = []
        this.codeTask = 0 
        
      }else if (this.mode == 'Computed'){
        
        this.tasks = this.tasks.filter((Item) => {

            return Item.Status == false
          })
          
          this.tasksComputed = []
          this.codeTask = 0 

        }else {

          this.tasks = this.tasks.filter((Item) => {
            
            return Item.Archive == false
          })
          
          this.tasksArchive = []
          this.codeTask = 0 
          
        }
        this.tagArry = ['school' , 'shopping']
        this.CounterLenghtMode = 0
        this.GetCodeTasks('save')
        this.saveToDrive()
        localStorage.setItem('TagTaskTodoList' , JSON.stringify(this.tagArry))
    },
    AddArchive (event){

      var IndexAddArchive = event.target.getAttribute('data-Index')
      
      if (this.mode == 'All'){
        if (this.ItemSelectedTag == 'All'){
          this.tasks[IndexAddArchive].Archive = true
        }else {
          this.arryShowTags[IndexAddArchive].Archive = true
          var titleIndex = this.arryShowTags[IndexAddArchive].code
          var searchIndexAddArchive = this.tasks.findIndex(item => {
            return item.code == titleIndex
          })
          this.tasks[searchIndexAddArchive].Archive = true
          
        }
      }else if (this.mode == 'active'){
        if (this.ItemSelectedTag == 'All'){
          this.tasksactive[IndexAddArchive].Archive = true
        }else {
          this.arryShowTags[IndexAddArchive].Archive = true
          var titleIndex = this.arryShowTags[IndexAddArchive].code
          var searchIndexAddArchive = this.tasks.findIndex(item => {
            return item.code == titleIndex
          })
          this.tasks[searchIndexAddArchive].Archive = true
        }
      }else if (this.mode == 'Computed'){
        if (this.ItemSelectedTag == 'All'){
          this.tasksComputed[IndexAddArchive].Archive = true
        }else {
          this.arryShowTags[IndexAddArchive].Archive = true
          var titleIndex = this.arryShowTags[IndexAddArchive].code
          var searchIndexAddArchive = this.tasks.findIndex(item => {
            return item.code == titleIndex
          })
          this.tasks[searchIndexAddArchive].Archive = true
        }
      }else {
        if (this.ItemSelectedTag == 'All'){
          this.tasksArchive[IndexAddArchive].Archive = true
        }else {
          this.arryShowTags[IndexAddArchive].Archive = true
          var titleIndex = this.arryShowTags[IndexAddArchive].code
          var searchIndexAddArchive = this.tasks.findIndex(item => {
            return item.code == titleIndex
          })
          this.tasks[searchIndexAddArchive].Archive = true
        }
      }
      
      this.FilterArr()
      this.saveToDrive()
      this.CounterLenghtMode--

    },
    returnArchive (){
      var IndexTasks = event.target.parentElement.parentElement.getAttribute("data-indexArry")
      var codetagArchive = this.tasksArchive[IndexTasks].code

      var findecodeBackArchive = this.tasks.findIndex(item =>{
        return item.code == codetagArchive
      })
      
      this.tasks[findecodeBackArchive].Archive = false
      this.tasksArchive[IndexTasks].Archive = false




      this.FilterArr()
      this.SelectOptionSelectvav()

      this.saveToDrive()
      this.CounterLenghtMode--
    },
    SortChanges (){
        var arr1 = [], arr2 = [], arr3 = [], arr4 = [], arr5 = [], arr6 = [], arr7 = [], arr8 = [], arr9 = [], arr10 = []
          this.tasks.forEach((TaskItem) => {
              if (TaskItem.sort == 1 ){
                arr1.unshift(TaskItem)
                
              }else if (TaskItem.sort == 2){
                arr2.unshift(TaskItem)
                
              }else if (TaskItem.sort == 3){
                arr3.unshift(TaskItem)
                
              }else if (TaskItem.sort == 4){
                arr4.unshift(TaskItem)
                
              }else if (TaskItem.sort == 5){
                arr5.unshift(TaskItem)
                
              }else if (TaskItem.sort == 6){
                arr6.unshift(TaskItem)
                
              }else if (TaskItem.sort == 7){
                arr7.unshift(TaskItem)
                
              }else if (TaskItem.sort == 8){
                arr8.unshift(TaskItem)
                
              }else if (TaskItem.sort == 9){
                arr9.unshift(TaskItem)
                
              }else if (TaskItem.sort == 10){
                arr10.unshift(TaskItem)              
              }
          })
        
          var resultc = arr1.concat(arr2, arr3 , arr4 , arr5 , arr6 , arr7 , arr8 , arr9 , arr10)
          this.tasks = resultc
          this.tasks.reverse(this.tasks)
          this.FilterArr()

      },
      editTagTasks (){
        if (this.NewTagSTR != '' && this.newOption == 'none'){
          this.resultTag = this.NewTagSTR
        }else if (this.NewTagSTR == '' && this.newOption != 'none'){
          this.resultTag = this.newOption
        }
        return this.resultTag
      }, 
      SelectOptionSelectvav (){
        var elemSelectorTag , elemSelectorTagValue
        
        if (this.mode == 'All'){
          if (this.Them == 'Light'){
            elemSelectorTag  = document.getElementById('SectionSelectPage1Light')
          }else {
            elemSelectorTag  = document.getElementById('SectionSelectPage1')
          }
          elemSelectorTagValue = elemSelectorTag.options[elemSelectorTag.selectedIndex].value
          this.ItemSelectedTag = elemSelectorTagValue
          
          this.arryShowTags = this.tasks.filter(item => {
            return item.tag == elemSelectorTagValue
          })
          
          
        }else if (this.mode == 'active'){
          if (this.Them == 'Light'){
            elemSelectorTag  = document.getElementById('SectionSelectPage2Light')
          }else {
            elemSelectorTag  = document.getElementById('SectionSelectPage2')
          }
          elemSelectorTagValue = elemSelectorTag.options[elemSelectorTag.selectedIndex].value
            this.ItemSelectedTag = elemSelectorTagValue
          
          this.arryShowTags = this.tasksactive.filter(item => {
            if (item.Status == false){
              return item.tag == elemSelectorTagValue
            }
          })

          
        }else if (this.mode == 'Computed'){
          if (this.Them == 'Light'){
            elemSelectorTag  = document.getElementById('SectionSelectPage3Light')
          }else [
            elemSelectorTag  = document.getElementById('SectionSelectPage3')
          ]
          elemSelectorTagValue = elemSelectorTag.options[elemSelectorTag.selectedIndex].value
            this.ItemSelectedTag = elemSelectorTagValue
          
          this.arryShowTags = this.tasksComputed.filter(item => {
            if (item.Status){
              return item.tag == elemSelectorTagValue
            }
          })

          
        }else {
          if (this.Them == 'Light'){
            elemSelectorTag  = document.getElementById('SectionSelectPage4Light')
          }else {
            elemSelectorTag  = document.getElementById('SectionSelectPage4')
          }
          elemSelectorTagValue = elemSelectorTag.options[elemSelectorTag.selectedIndex].value
          this.ItemSelectedTag = elemSelectorTagValue

          this.arryShowTags = this.tasksArchive.filter(item => {
            if (item.Archive){
              return item.tag == elemSelectorTagValue
            }
          })


        }
      },
      taskCounterNumber (){
        this.SortChanges()
        this.CounterLenghtMode = 0
        
        


        if (this.mode == 'All'){
          if (this.ItemSelectedTag == 'All'){
            
          this.tasks.forEach(item => {
            if (item.Archive == false){
              this.CounterLenghtMode++
            }
          })
        }else {
          this.arryShowTags.forEach(item => {
            if (item.Archive == false){
              this.CounterLenghtMode++
            }
          })
        }
        }else if (this.mode == 'active'){

          if (this.ItemSelectedTag == 'All'){

            this.tasksactive.forEach(item => {
              if (item.Archive == false){
                this.CounterLenghtMode++
              }
            })
          }else {
            this.arryShowTags.forEach(item => {
              if (item.Archive == false){
                this.CounterLenghtMode++
              }
            });
          }

        }else if (this.mode == 'Computed'){

          if (this.ItemSelectedTag == 'All'){

            this.tasksComputed.forEach(item => {
              
              if (item.Archive == false){
                this.CounterLenghtMode++
              }
            })
          }else {
            this.arryShowTags.forEach(item => {
              if (item.Archive == false){
                this.CounterLenghtMode++
              }
            });
          }

        }else {
          if (this.ItemSelectedTag == 'All'){
            
            this.tasksArchive.forEach(item => {
              
              if (item.Archive == true){
                this.CounterLenghtMode++
              }
            })
          }else {
            this.arryShowTags.forEach(item => {
              if (item.Archive == true){
                this.CounterLenghtMode++
              }
            });
          }

        }
      },


  },


  getters: {
    
  }
})