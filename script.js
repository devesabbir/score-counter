const addNewMatch = document.getElementById('addNewMatch');
const resetBtn = document.getElementById('resetBtn');
const matchContainer = document.getElementById('matchContainer');

let matches = [
   
]


// Generate a new ID based on the last index number
function generateNewId(matches) {
    if (matches.length === 0) {
      // If no existing IDs, start with 1
      return 1;
    } else {
      // Otherwise, increment the last index number
      return matches[matches.length - 1].id + 1;
    }
  }
  

// add new matche handler
addNewMatch.addEventListener('click', function(){
   const newMatchData = {
      id: generateNewId(matches),
      score: 0
   }
   matches.push(newMatchData)
   renderAllMatch()
})

// delete match handler
function handleDeleteMatch(id) {
    matches = matches.filter(match => match.id !== id);
    // Re-render the matches after deletion
    renderAllMatch();
}

// increment score handler
function incrementScore(e, id) {
   e.preventDefault()
   const newScore = e.target.querySelector('.lws-increment').value;
   const findIndex = matches.findIndex(match => match.id === id);
   matches[findIndex] = {
     ...matches[findIndex],
     score:matches[findIndex].score + parseInt(newScore)
   }

   renderAllMatch();
}

// decrement score handler   
function decrementScore(e, id) {
    e.preventDefault()
    const newScore = e.target.querySelector('.lws-decrement').value;
    const findIndex = matches.findIndex(match => match.id === id);
    matches[findIndex] = {
      ...matches[findIndex],
      score:matches[findIndex].score > 0 && !((matches[findIndex].score - parseInt(newScore)) < 0) ? matches[findIndex].score - parseInt(newScore) : matches[findIndex].score
    }
    renderAllMatch();

 }


 resetBtn.addEventListener('click', function(){
     matches = matches.map(m => {
        return {...m, score:0}
     })

     renderAllMatch()
 })

// render all matches in dom
const renderAllMatch = () => {
    let match = '' 
    matches.forEach(m => {
      match += `<div class="match">
       <div class="wrapper">
           <button onclick="handleDeleteMatch(${m?.id})" class="lws-delete">
               <img src="./image/delete.svg" alt="" />
           </button>
           <h3 class="lws-matchName">Match ${m?.id}</h3>
       </div>
       <div class="inc-dec">
           <form onsubmit="incrementScore(event, ${m?.id})" id="incrementForm" class="incrementForm">
               <h4>Increment</h4>
               <input
                   type="number"
                   name="increment"
                   class="lws-increment"
               />
           </form>
           <form onsubmit="decrementScore(event, ${m?.id})" id="decrementForm" class="decrementForm">
               <h4>Decrement</h4>
               <input
                   type="number"
                   name="decrement"
                   class="lws-decrement"
               />
           </form>
       </div>
       <div class="numbers">
           <h2 class="lws-singleResult">${m?.score}</h2>
       </div>
       </div>`
    })

    matchContainer.innerHTML = match
}

// initialize render dom
renderAllMatch()