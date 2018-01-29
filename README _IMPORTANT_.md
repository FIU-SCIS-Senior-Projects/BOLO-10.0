
ALWAYS add this code around a function that will render a new page. REQUIRED for securing GRID CARD access:

var grid = req.session.grid;
if(grid)
{
	//render page

}

else
{
	res.redirect('/bingo');
}
