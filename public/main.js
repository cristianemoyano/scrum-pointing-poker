var input_name = document.getElementById('update_input_name');
var input_quote = document.getElementById('update_input_quote');

function handlerUpdateItem(id) {
name = input_name.value;
quote = input_quote.value;

if (name != '' && quote != '') {
 fetch('quotes', {
   method: 'put',
   headers: {'Content-Type': 'application/json'},
   body: JSON.stringify({
     'id': id,
     'name': input_name.value,
     'quote': input_quote.value,
   })
 })
 .then(res => {
     if (res.ok) return res.json()
   }).
   then(data => {
     console.log(data)
     window.location.reload()
   });
 }
}

function handlerDeleteItem(id) {
  fetch('quotes', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'id': id,
    })
  })
  .then(res => {
    if (res.ok) return res.json()
  }).
  then(data => {
    console.log(data)
    window.location.reload()
 });
}
