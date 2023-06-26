<script setup>
import { useCounterStore } from '../stores/counter';
import { onBeforeMount, onMounted } from 'vue';


const store = useCounterStore()

onBeforeMount(() => {
  store.PageLoadInforamtion()
})
onMounted(()=> {
  store.taskCounterNumber()

})

</script>

<template>

<div :class="[(store.ShowModalTask ? 'BlurMangment' : ''),(store.Them == 'Light' ? 'ManegmentTasks' : 'ManegmentTasksDark')]">
  <div class="NavBarList">
    <button @click="store.mode = 'All'; store.taskCounterNumber();store.ItemSelectedTag = 'All'; " class="btnNav" :class="[(store.mode == 'All' && store.Them == 'Light' ? 'focusBtnNav' : ''),(store.Them == 'Light'  ? 'btnAddTodos' : 'btnAddTodosDark' ),(store.mode == 'All' && store.Them == 'Dark') ? 'focusBtnNavDark' : '']" title="All Taks" >All</button>
    <button @click="store.mode = 'active' ; store.taskCounterNumber();store.ItemSelectedTag = 'All';"  class="btnNav" :class="[(store.mode == 'active' && store.Them == 'Light' ? 'focusBtnNav' : ''),(store.Them == 'Light'  ? 'btnAddTodos' : 'btnAddTodosDark' ),(store.mode == 'active' && store.Them == 'Dark') ? 'focusBtnNavDark' : '']" title="Active Tasks">active</button>
    <button @click="store.mode = 'Computed'; store.taskCounterNumber();store.ItemSelectedTag = 'All';"  class="btnNav" :class="[(store.mode == 'Computed' && store.Them == 'Light' ? 'focusBtnNav' : ''),(store.Them == 'Light'  ? 'btnAddTodos' : 'btnAddTodosDark' ),(store.mode == 'Computed' && store.Them == 'Dark') ? 'focusBtnNavDark' : '']" title="Computed Tasks">Computed</button>
    <button @click="store.mode = 'Archive'; store.taskCounterNumber();store.ItemSelectedTag = 'All';"  class="btnNav" :class="[(store.mode == 'Archive' && store.Them == 'Light' ? 'focusBtnNav' : ''),(store.Them == 'Light'  ? 'btnAddTodos' : 'btnAddTodosDark' ),(store.mode == 'Archive' && store.Them == 'Dark') ? 'focusBtnNavDark' : '']" title="Archive Tasks">Archive</button>
    <span style="align-self: center;">|</span>
    <button @click="store.EmpetyArry" class="btnNav " :class="[(store.Them =='Light' ? 'btnAddTodos' : 'btnAddTodosDark')]" title="Clear All Tasks" >Clear All</button>
    <button @click="[(store.Them == 'Dark') ? store.Them = 'Light' : store.Them = 'Dark' , store.saveToDrive()]" class="btnNav " :class="[(store.Them == 'Light' ? 'btnAddTodos' : 'btnAddTodosDark')]" title="Swich Theme">
    <span v-show="store.Them == 'Light'">Dark</span>
    <span v-show="store.Them == 'Dark'">Light</span>
    </button>
  </div>
  <!-- Section All  -->
  <div id="AddTodo" v-show="store.mode == 'All'">
    <h3>Tasks {{store.mode}} {{store.CounterLenghtMode}}</h3>
    <div class="btnAndSelectTag">
      <select :id="(store.Them == 'Light') ? 'SectionSelectPage1Light' : 'SectionSelectPage1'" @change="store.SelectOptionSelectvav() ; store.taskCounterNumber()" v-model="store.ItemSelectedTag">
        <option selected value="All">All</option>
        <option v-for="tag in store.tagArry" :value="tag">{{tag}}</option>
      </select>
      <button @click="store.IsShowModalTask" :class="(store.Them == 'Light') ? 'btnAddTodos' : 'btnAddTodosDark'">Add New Todo</button>
    </div>
  </div>
  <p class="VacantTasks" v-show="store.CounterLenghtMode == 0  && store.mode == 'All'">
    Empty From Tasks
  </p>
  
   <div id="Tasks" class="CounterAll" v-show="store.CounterLenghtMode != 0 && store.mode == 'All'">
    <div :class="(store.Them == 'Light' ? 'ItemTask' : 'ItemTaskِDark')" v-for="(Task , index ) in (store.ItemSelectedTag == 'All' )? store.tasks : store.arryShowTags" :data-indexArry="index"  v-show="Task.Archive == false"  :style="(Task.color != null) ? Task.color : store.colorDefualt">
      <div class="circleCheck" > 
       <i @click="store.ChekcTickTask" class="fa-regular fa-circle" v-show="Task.Status == false"></i>
       <i @click="store.ChekcTickTask" class="fa-solid fa-circle-check" v-show="Task.Status"></i>
      </div>
      <div class="titleAndDescription" @click="store.EditTask" >
        <del class="title" v-show="Task.Status" :data-Index="index" :style="(Task.color != null) ? Task.color : store.colorDefualt">{{Task.title}}</del>
        <span class="title" v-show="Task.Status == false" :data-Index="index" :style="(Task.color != null) ? Task.color : store.colorDefualt">{{Task.title}}</span>
      </div>
      <div class="Icons">
        <i class="fa-solid fa-pen" @click="store.EditTask" :data-Index="index" title="Edit Tasks"></i>
        <i class="fa-solid fa-box-archive" title="Add To Archive" @click="store.AddArchive" :data-Index="index"></i>
        <i class="fa-solid fa-trash" @click="store.RemoveTasks" title="Remove Tasks"></i>
      </div>
    </div>
  </div>
  <!-- Section active  -->
  
  <div id="AddTodo" v-show="store.mode == 'active'">
    <h3>Tasks {{store.mode}} {{store.CounterLenghtMode}}</h3>
      <div class="btnAndSelectTag">
      <select :id="(store.Them == 'Light') ? 'SectionSelectPage2Light' : 'SectionSelectPage2'" @change="store.SelectOptionSelectvav() ; store.taskCounterNumber()" v-model="store.ItemSelectedTag">
        <option selected value="All">All</option>
        <option v-for="tag in store.tagArry" :value="tag">{{tag}}</option>
      </select>
      <button @click="store.IsShowModalTask" :class="(store.Them == 'Light') ? 'btnAddTodos' : 'btnAddTodosDark'">Add New Todo</button>
    </div>
  </div>
  <p class="VacantTasks" v-show="store.CounterLenghtMode == 0  && store.mode == 'active'">
    Empty From Tasks
  </p>
  
   <div id="Tasks" class="CounterActive" v-show="store.CounterLenghtMode != 0 && store.mode == 'active'" >
    <div :class="(store.Them == 'Light' ? 'ItemTask' : 'ItemTaskِDark')" v-for="(Task , index ) in (store.ItemSelectedTag == 'All' )? store.tasksactive : store.arryShowTags" :data-indexArry="index" v-show="Task.Archive == false"  :style="(Task.color != null) ? Task.color : store.colorDefualt">
      <div class="circleCheck" >
       <i @click="store.ChekcTickTask()" class="fa-regular fa-circle" v-show="Task.Status == false"></i>
       <i @click="store.ChekcTickTask" class="fa-solid fa-circle-check" v-show="Task.Status"></i>
      </div>
      <div class="titleAndDescription" @click="store.EditTask">
         <del class="title" v-show="Task.Status" :data-Index="index"  :style="(Task.color != null) ? Task.color : store.colorDefualt">{{Task.title}}</del>
        <span class="title" v-show="Task.Status == false" :data-Index="index"  :style="(Task.color != null) ? Task.color : store.colorDefualt">{{Task.title}}</span>
      </div>
      <div class="Icons">
        <i class="fa-solid fa-pen" @click="store.EditTask" :data-Index="index" title="Edit Tasks"></i>
        <i class="fa-solid fa-box-archive" title="Add To Archive" @click="store.AddArchive " :data-Index="index"></i>
        <i class="fa-solid fa-trash" @click="store.RemoveTasks" title="Remove Tasks"></i>
      </div>
    </div>
  </div>
  <!-- Section Computed -->
  <div id="AddTodo" v-show="store.mode == 'Computed'">
    <h3>Tasks {{store.mode}} {{store.CounterLenghtMode}}</h3>
      <div class="btnAndSelectTag">
      <select :id="(store.Them == 'Light') ? 'SectionSelectPage3Light' : 'SectionSelectPage3'" @change="store.SelectOptionSelectvav() ; store.taskCounterNumber()" v-model="store.ItemSelectedTag">
        <option value="All">All</option>
        <option v-for="tag in store.tagArry" :value="tag">{{tag}}</option>
      </select>
      <button @click="store.IsShowModalTask" :class="(store.Them == 'Light') ? 'btnAddTodos' : 'btnAddTodosDark'">Add New Todo</button>
    </div>
  </div>
  <p class="VacantTasks" v-show="store.CounterLenghtMode == 0  && store.mode == 'Computed'">
    Empty From Tasks
  </p>
  
   <div id="Tasks" class="CounterComputed" v-show="store.CounterLenghtMode != 0 && store.mode == 'Computed'">
    <div :class="(store.Them == 'Light' ? 'ItemTask' : 'ItemTaskِDark')" v-for="(Task , index ) in (store.ItemSelectedTag == 'All' )? store.tasksComputed : store.arryShowTags" :data-indexArry="index"  v-show="Task.Archive == false"  :style="(Task.color != null) ? Task.color : store.colorDefualt">
      <div class="circleCheck" >
       <i @click="store.ChekcTickTask" class="fa-regular fa-circle" v-show="Task.Status == false"></i>
       <i @click="store.ChekcTickTask" class="fa-solid fa-circle-check" v-show="Task.Status"></i>
      </div>
      <div class="titleAndDescription" @click="store.EditTask">
        <del class="title" v-show="Task.Status" :data-Index="index"  :style="(Task.color != null) ? Task.color : store.colorDefualt">{{Task.title}}</del>
        <span class="title" v-show="Task.Status == false" :data-Index="index"  :style="(Task.color != null) ? Task.color : store.colorDefualt">{{Task.title}}</span>
      </div>
      <div class="Icons">
        <i class="fa-solid fa-pen" @click="store.EditTask" :data-Index="index" title="Edit Tasks"></i>
        <i class="fa-solid fa-box-archive" title="Add To Archive" @click="store.AddArchive" :data-Index="index"></i>
        <i class="fa-solid fa-trash" @click="store.RemoveTasks" title="Remove Tasks"></i>
      </div>
    </div>
  </div>
  <!-- Section Archive -->
  <div id="AddTodo" v-show="store.mode == 'Archive'">
    <h3>Tasks {{store.mode}} {{store.CounterLenghtMode}}</h3>
        <div class="btnAndSelectTag">
      <select :id="(store.Them == 'Light') ? 'SectionSelectPage4Light' : 'SectionSelectPage4'" @change="store.SelectOptionSelectvav() ; store.taskCounterNumber()" v-model="store.ItemSelectedTag">
        <option selected value="All">All</option>
        <option v-for="tag in store.tagArry" :value="tag">{{tag}}</option>

      </select>
    <button @click="store.IsShowModalTask" :class="(store.Them == 'Light') ? 'btnAddTodos' : 'btnAddTodosDark'">Add New Todo</button>
      </div>
  </div>
  <p class="VacantTasks" v-show="store.CounterLenghtMode == 0 && store.mode == 'Archive'">
    Empty From Tasks
  </p>
  
   <div id="Tasks" class="CounterArchive" v-show="store.CounterLenghtMode != 0 && store.mode == 'Archive'">
    <div :class="(store.Them == 'Light' ? 'ItemTask' : 'ItemTaskِDark')" v-for="(Task , index ) in (store.ItemSelectedTag == 'All' )? store.tasksArchive : store.arryShowTags" :data-indexArry="index"  v-show="Task.Archive == true"  :style="(Task.color != null) ? Task.color : store.colorDefualt">
      <div class="circleCheck" >
       <i @click="store.ChekcTickTask" class="fa-regular fa-circle" v-show="Task.Status == false"></i>
       <i @click="store.ChekcTickTask" class="fa-solid fa-circle-check" v-show="Task.Status"></i>
      </div>
      <div class="titleAndDescription" @click="store.EditTask">
        <del class="title" v-show="Task.Status" :data-Index="index"  :style="(Task.color != null) ? Task.color : store.colorDefualt">{{Task.title}}</del>
        <span class="title" v-show="Task.Status == false" :data-Index="index"  :style="(Task.color != null) ? Task.color : store.colorDefualt">{{Task.title}}</span>
      </div>
      <div class="Icons">
        <i class="fa-solid fa-pen" @click="store.EditTask" :data-Index="index"></i>
        <i class="fa-solid fa-rotate-left" @click="store.returnArchive()" title="Return"></i>
        <i class="fa-solid fa-trash" @click="store.RemoveTasks" title="Remove Tasks"></i>
      </div>
    </div>
  </div>
  <div id="Date">
    {{store.TimeDate()}}
  </div>
</div>

<div v-show="store.ShowModalTask" :class="(store.Them == 'Light' ? 'showModalAddNew' : 'showModalAddNewDark')">
  <div class="navNote">
    <i @click="store.AddNewTask" class="fa-solid fa-folder-plus" title="Save Task"></i>
    <i @click="store.IsShowModalTask" class="fa-solid fa-arrow-right-from-bracket" title="Close"></i>
  </div>
  <div class="SortAndInput">
    <div class="Input">
      <input :class="(store.erorrVacantTitle) ? 'dangerColor' : ''" type="text" class="TitleNote" placeholder="Title" v-model="store.Title" @keyup.enter="store.AddNewTask">
      <textarea cols="3" rows="3" placeholder="Desciption" class="DescriptionNote" v-model="store.Description"></textarea>
    </div>
    <div class="Sort">
      <i @click="(store.SortAddTasks < 10) ? store.SortAddTasks++ : ''" class="fa-solid fa-sort-up" title="Sort | رتبه بندی"></i>
      <span title="Sort | رتبه بندی">{{store.SortAddTasks}}</span>
      <i @click="(store.SortAddTasks > 1) ? store.SortAddTasks-- : ''" class="fa-solid fa-sort-down" title="Sort | رتبه بندی"></i>
    </div>
  </div>
  <div class="tagTask">
    <div class="SelectTag">
      <span>Task Select Tag :</span>
      <select :class="(store.Them == 'Light') ? 'SelectTagInput' : 'SelectTagInputDark'" id="SelectTag" @change="store.NewTagSTR = ''" v-model="store.newOption" >
        <option id="orange" selected  value="none">none</option>
        <option v-for="tag in store.tagArry" :value="tag">{{tag}}</option>
      </select>
    </div>
    <div class="AddTag">
      <span>Add New Tag : </span>
      <input :class="(store.Them == 'Light') ? 'InputAddTag' : 'InputAddTagDark'" type="text" placeholder="Enter Tag (example : school)" @keydown="store.newOption = 'none'" v-model="store.NewTagSTR">
    </div>
  </div>
  <div class="selectColor">
    <span>Color Tasks Select :</span>
    <div class="BoxColor">
      <i @click="store.colorTask = {color :'#4fc08d' }" class="fa-solid fa-square IconsSelectColor" style="color: #4fc08d ;"></i>
      <i @click="store.colorTask = {color :'#FFB703' }" class="fa-solid fa-square IconsSelectColor" style="color: #FFB703 ;"></i>
      <i @click="store.colorTask = {color :'#FF006E' }" class="fa-solid fa-square IconsSelectColor" style="color: #FF006E ;"></i>
      <i @click="store.colorTask = {color :'#FFAFCC' }" class="fa-solid fa-square IconsSelectColor" style="color: #FFAFCC ;"></i>
      <i @click="store.colorTask = {color :'#4CC9F0' }" class="fa-solid fa-square IconsSelectColor" style="color: #4CC9F0 ;"></i>
      <i @click="store.colorTask = {color :'#9B5DE5' }" class="fa-solid fa-square IconsSelectColor" style="color: #9B5DE5 ;"></i>
    </div>
  </div>
  <div class="DateNote">
    <span v-show="store.showDateAddNewTasks">Date of Registration : {{store.lastDateTasks}}</span>
    <span id="dateADdTask" v-show="store.showDateAddNewTasks == false ">{{store.TimeDate()}}</span>
    
  </div>
</div>

</template>

<style>

@import url(../assets/style/style.css);
@import url(../assets/style/Respansive.css);
@import url(../assets/style/all.css);

</style>