module.exports = function(type) {
   if(type == 'water') return 'bg-primary'
   else if (type == 'grass') return 'bg-success'
   else if (type == 'fire') return 'bg-danger'
   else if (type == 'electric') return 'bg-warning'
   else if (type == 'ice') return 'bg-info'
   else if (type == 'normal') return 'bg-secondary'
   else return 'bg-white'
}