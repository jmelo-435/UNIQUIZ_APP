const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const www = process.env.WWW || './dist';

app.use(express.static(path.join(__dirname, 'build')));
console.log(`serving ${www}`);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
