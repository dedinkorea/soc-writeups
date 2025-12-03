# Drive-by Compromise (T1189) – yummyrecipesforme[.]com

Реальный разбор PCAP из Google Cybersecurity Certificate  
с правильными выводами уровня L1/L2 SOC-аналитика 2025 года

**Аналитик:** dedinkorea  
**Дата:** декабрь 2025  
**Уровень уверенности:** High  
**TLP:** WHITE  

### Краткое описание
Легитимный сайт yummyrecipesforme[.]com был дефейснут через brute-force админки (дефолтные admin/admin).  
Атакующий внедрил вредоносный JavaScript → client-side редирект всех посетителей на злонамеренный домен greatrecipesforme[.]com.

### Файлы в репозитории
- `README.md` – ты тут  
- `analysis.md` – полный отчёт с IOC, timeline, MITRE ATT&CK, root cause и рекомендациями  
- `yummy_defacement.pcapng` – оригинальный захват трафика  
- `extracted_malicious.js` – (опционально) вытащенный скрипт

### Ключевые навыки, которые демонстрирует этот write-up
- Анализ PCAP (Wireshark/tcpdump)  
- Выделение и верификация IOC  
- MITRE ATT&CK mapping  
- Написание отчёта уровня SOC L1/L2  
- Рекомендации по remediation и hardening
