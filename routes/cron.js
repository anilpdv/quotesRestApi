const PythonShell = require('python-shell');

PythonShell.run('whatsapp_messaging.py', null, function(err) {
  if (err) throw err;
  console.log('finished');
});
