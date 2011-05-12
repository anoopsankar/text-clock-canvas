/**

Licensed under the BSD License
 
Copyright (c) 2011, Anoop Sankar
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of the author nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL ANOOP SANKAR BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS

**/
 
//                          0         1        2        3         4 
var clockface = new Array('IT',     'L',     'IS',     'ASTIME', 'AC',           // 0
                           'QUARTER','DC',    'TWENTY', 'FIVE',   'X',            // 5
                           'HALF',   'B',     'TEN',    'FBO',    'PAST',         // 10
                           'TO',     'U',     'NINE',   'ONE',    'SIX',          // 15
                           'THREE',  'FOUR',  'FIVE',   'TWO',    'EIGHT',        // 20
                           'ELEVEN', 'SEVEN', 'TWELVE', 'TEN',    'S',            // 25
                           "O'CLOCK");

var hour_indices   = new Array(27, 18, 23, 20, 21, 22, 19, 26, 24, 17, 28, 25, 27);
var minute_indices = new Array(30, 8, 12,  5,  7, [7,8], 10); 
var past_index     = 14;
var to_index       = 15;

var STYLE_HIGHLIGHT = '#dedede';
var STYLE_NORMAL    = '#282828';

var canvas_ctx;

function init() {
    my_canvas = document.getElementById('canvas');
    canvas_ctx = my_canvas.getContext('2d');
    
    canvas_ctx.font = '36px "FreeMono","CourierNew",monospace';
        
    update();
    setInterval(update, 1000 * 20);
}

// Function to update time, called every 20 secs. 
//
function update() {
    draw_text(canvas_ctx, clockface, format_time_highlight());
    //draw_fraction_dots(canvas_ctx);
}

// Formats the time and returns an array index for 
// highlighting required words in the clockface
//
function format_time_highlight() {
    
    var current_time = new Date();
    
    hours = current_time.getHours();
    minutes = current_time.getMinutes();
       
    if (hours >= 12) hours = hours - 12;
    is_past_half_hour = (minutes > 30);
    
    if (is_past_half_hour) {
        minutes = 60 - minutes;
        hours++;
    }
    
    highlight = [0, 2];   // "IT IS"
    minute_index = Math.round(minutes / 5);
    
    if (minute_indices[minute_index] instanceof Array) {
        highlight = highlight.concat(minute_indices[minute_index]);
    } else {
        highlight.push (minute_indices[minute_index]);
    }
    console.log("Hours:", hours);
    highlight.push (hour_indices[hours]);
    
    if (minute_index != 0) {
        if (is_past_half_hour) {
            highlight.push (to_index);
        } else {
            highlight.push (past_index); 
        }
    }
    
    return highlight;
}


// Draws the clockface text on screen.
//  * context   : a canvas 2D context
//  * face      : the complete text to be displayed as an array of words
//  * highlight : array of indices to the 'face' array, for words to be highlighted

function draw_text(context, face, highlight) {

    context.clearRect(0, 0, 500, 1000)   // workaround to clear canvas.
    
    x = 10; y = 40;
    line_char_count = 0;
    
    // Bonus: While I did this; learnt that you musn't use for..in for array iterations.
    // https://developer.mozilla.org/en/JavaScript/Reference/Statements/for...in#Description    
    
    for (i = 0; i < face.length; i++) {
        
        if (highlight.indexOf(i) != -1) {
            context.shadowColor = "#FF00FF"
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
            context.shadowBlur = 5;
            context.fillStyle = STYLE_HIGHLIGHT;
        } else {
            context.shadowBlur = 0;
            context.fillStyle = STYLE_NORMAL;
        }
        
        context.fillText(face[i], x, y);
        x += context.measureText(face[i]).width;
        
        line_char_count += face[i].length;
        
        // this is probably how real gfx programmers do a line feed. :|
        if (line_char_count > 10) {
            line_char_count = 0;
            y += 40;
            x = 10;
        }
    }
}

function draw_fraction_dots(context) {
    var current_time = new Date();
    num_dots = current_time.getMinutes() % 5;
    console.log(num_dots);
    
    for (i = 1; i <= 5; i++) {
        if (i <= num_dots) { 
            context.fillStyle = STYLE_HIGHLIGHT;
        } else {
            context.fillStyle = STYLE_NORMAL;
        }
                
        context.beginPath();
        context.arc(10 + (i * 10), 10, 2, 0, Math.PI*2, true);
        context.closePath();
                
        context.fill();
    }
}
