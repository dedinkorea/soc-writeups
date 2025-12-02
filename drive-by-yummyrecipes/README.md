# Drive-by Compromise через взломанный легитимный сайт

**Реальный разбор PCAP из корпоративного инцидента**  
**Дата анализа:** декабрь 2025  
**Источник лабы:** Google Cybersecurity Certificate (имитация реального кейса)

### Кратко о происшествии
Легитимный кулинарный сайт yummyrecipesforme.com взломали через brute-force админки (пароль по умолчанию).  
Атакующий закинул вредоносный JavaScript → при загрузке страницы пользователи автоматически перенаправлялись на фишинговый/малварный домен greatrecipesforme.com.

### IOC
- Легитимный домен: yummyrecipesforme.com → 203.0.113.22
- Злонамеренный домен: greatrecipesforme.com → 192.0.2.17
- Протоколы: DNS + HTTP (порт 80, без HTTPS)

### Таймлайн из трафика
1. 14:18:32 → нормальный DNS + HTTP к оригинальному сайту  
2. 14:20:32 → внезапный DNS-запрос к greatrecipesforme.com (клиент сделал сам)  
3. 14:25:29 → полное TCP-соединение и GET-запрос к вредоносному домену

→ Признаков MitM / ARP-spoofing / DNS-spoofing нет → редирект инициирован JavaScript’ом на легитимной странице.

### MITRE ATT&CK
- T1078 — Valid Accounts (дефолтные учётки)
- T1190 — Exploit Public-Facing Application
- T1189 — Drive-by Compromise

### Root Cause
Brute-force админки → изменение HTML/JS → внедрение вредоносного кода.

### Рекомендации (то, что реально ставят в продакшене)
1. Сброс всех default-паролей + политика 16+ символов
2. MFA/2FA на админ-панель (обязательно!)
3. WAF (Cloudflare / ModSecurity + OWASP CRS)
4. Принудительный HTTPS + HSTS + CSP
5. File Integrity Monitoring (Wazuh / OSSEC / Tripwire)
6. Защита от brute-force (Fail2ban, Cloudflare Firewall Rules)

### Файл трафика
[yummy_defacement.pcapng](yummy_defacement.pcapng) — открывается в Wireshark

---
Этот кейс — пример анализа сетевого трафика и подготовки отчёта уровня Junior/Middle SOC.
