
var fonts = ["serif","sans-serif","Open Sans, sans-serif","Roboto, sans-serif","Roboto Condensed, sans-serif","Roboto Slab, serif","Source Serif Pro, serif","Exo, sans-serif","monospace"]
var fontSizes = [1,2,3,4,5,6,7]
var doc = null
var currentPenColor = '#333333'

var changeFont = function(newFont){
	$('#textarea').focus()
	document.execCommand('fontName',false,newFont)
}

var changeFontSize = function(newSize){
	$('#textarea').focus()
	document.execCommand('fontSize',false,newSize)
}

var changeFontCol = function(newCol){
	currentPenColor = newCol
	var ret = document.execCommand('foreColor',false,newCol)
}

var setSelectFontListeners = function(){
	$('#textarea').on('click','font',function(e){
		var _fontName = e.target.face
		var _fontSize = e.target.size
		if(_fontName){
			var index = fonts.indexOf(_fontName)
			if(index >= 0){
				$('#font-family').val(index)
			}
		}
		if(_fontSize) $('#font-size').val(_fontSize)
	})
}

$(function(){

	doc = $('#textarea')

	var width = 170
	var initFontIndex = 0, initFontSize = 4

	for( var i = 0; i< fonts.length; ++i ){
		var font = fonts[i].split(',')[0]
		var added = $('#font-family').append('<option value='+i+' style="font-family: '+fonts[i]+'; font-size: 18px">'+font+'</option>')
		width = Math.max(width,added.width())
	}

	$('#font-family').width(width+10)

	for( var i=0; i<fontSizes.length; ++i ){
		var fontsz = 6 + 2 * fontSizes[i]
		$('#font-size').append('<option value='+fontSizes[i]+'>'+fontsz+'</option>')
	}

	$('#font-family').val(initFontIndex)
	$('#font-size').val(initFontSize)
	
	changeFont(fonts[initFontIndex])
	changeFontSize(initFontSize)
	changeFontCol(currentPenColor)

	$('#font-family').on('change',function(){
		var ff = fonts[Number($(this).val())]
		changeFont(ff)
		$(this).css({'font-family': ff})
	})

	$('#font-size').on('change',function(){
		changeFontSize($(this).val())
	})

	$('#textarea').on('blur',function(){
		var markup = $(this).html()
		$('#displayText').text(markup)
		$('#displayMarkup').html(markup)
	})

	$('#text-color').click((e)=>{
		$('#palette').toggle()
		e.stopPropagation()
	})
	
	$('body').click(()=>{
		$('#palette').hide()
	})
	
	$('.color-btn').click((e)=>{
		currentPenColor = '#'+e.target.id
		$('#text-color').css({'color': currentPenColor})
	})

	$('#textarea').click(()=>{
		changeFontCol(currentPenColor)
	})

	setSelectFontListeners()

})
