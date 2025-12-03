# Drive-by Compromise (MITRE T1189) – yummyrecipesforme[.]com

**Аналитик:** dedinkorea  
**Дата:** декабрь 2025  
**TLP:** WHITE  

### Цель кейса
Практический разбор реального PCAP из Google Cybersecurity Certificate 

### Исходные данные
- Один захват трафика (yummy_defacement.pcapng)  
- Симуляция жертвы, зашедшей на легитимный сайт  
- Задача: определить вектор атаки, выделить IOC, предложить remediation и detection

### Мой вклад
- Полный анализ в Wireshark  
- Выделение IOC и цепочки компрометации  
- MITRE ATT&CK mapping  
- Написание Suricata/Sigma-правила  
- Практические рекомендации по hardening

### Ограничения
Учебный сценарий Google Qwiklabs. Все выводы и правила протестированы на реальных инструментах.

**Артефакты:** папка [artifacts/](artifacts/)  
**Подробный отчёт:** [analysis.md](analysis.md)  
**Исходный трафик:** [yummy_defacement.pcapng](yummy_defacement.pcapng)
