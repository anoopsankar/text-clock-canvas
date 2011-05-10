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



var words = "IT,L,IS,AS,TIME,A,C,QUARTER,DC,TWENTY,KIVE,X,HALF,B,TEN,F,TO,PAST,ERU,NINE,ONE,SIX,THREE,FOUR,FIVE,TWO,EIGHT,ELEVEN,SEVEN,TWELVE,LEN,S,O'CLOCK".split(',');
var numbers = "ZERO,ONE,TWO,THREE,FOUR,FIVE,SIX,SEVEN,EIGHT,NINE,TEN,ELEVEN,TWELVE".split(',');
var minute_desc = "O'CLOCK:FIVE:TEN:QUARTER:TWENTY:HALF:HALF".split(':');
var joiners = "PAST,TO".split(',');

var canvas_ctx;

function init() {
    my_canvas = document.getElementById('canvas');
    canvas_ctx = my_canvas.getContext('2d');
    
    canvas_ctx.font = "36px Courier";
    
    update();
    setInterval(update, 1000 * 20);
}

function update() {
    draw_clock(parse_time());
}

function parse_time() {
    var currentTime = new Date();
    
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    
    if (hours > 12) hours = hours - 12;
    
    var time_string = "IT,IS,";
    
    if (minutes < 35) {
        minute_index = Math.round(minutes / 5) ;
        time_string += minute_desc[minute_index];
        if (minute_index != 0) 
            time_string += ",PAST,";
        else 
            time_string += ",";
            
        time_string += numbers[hours];
    } else {
        minute_index = Math.round((60 - minutes) / 5) ;
        time_string += minute_desc[minute_index];
        if (minute_index != 0) 
            time_string += ",TO,";
        else
            time_string += ",";
        time_string += numbers[hours + 1];
    }
    
    console.log(time_string);
    return time_string.split(',');
}


function draw_clock(highlighted_words) {
    
    canvas_ctx.clearRect(0,0,500,1000); // clear canvas  
    
    x = 50;
    y = 50;
    char_count = 0;
    
    for (i in words) {
        if (highlighted_words.indexOf(words[i]) == -1) {
            canvas_ctx.fillStyle = '#282828';
        } else {
            canvas_ctx.fillStyle = '#DEDEDE';
        }
        
        canvas_ctx.fillText(words[i], x, y);
        x += canvas_ctx.measureText(words[i]).width;
        
        char_count += words[i].length;
        
        if (char_count > 10) {
            char_count = 0;
            y += 40;
            x = 50;
        }
    }
}
