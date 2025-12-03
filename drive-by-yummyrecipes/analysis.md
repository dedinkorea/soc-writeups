# Подробный анализ: Drive-by Compromise (T1189)

## Содержание
- [Описание инцидента](#описание-инцидента)
- [Технический разбор трафика](#технический-разбор-трафика)
- [IOCs](#iocs)
- [MITRE ATT&CK](#mitre-attck)
- [Root Cause](#root-cause)
- [Potential Impact](#potential-impact)
- [Рекомендации](#рекомендации)
- [Detection & Hunting](#detection--hunting)
- [Lessons Learned](#lessons-learned)

## Описание инцидента
Легитимный сайт yummyrecipesforme[.]com был скомпрометирован через успешный brute-force административной панели (дефолтные учётные данные admin/admin).  
Атакующий внедрил вредоносный JavaScript, выполняющий client-side редирект всех посетителей на злонамеренный домен greatrecipesforme[.]com.

## Технический разбор трафика
- 14:18:32 – успешный HTTP GET → 203.0.113.22 (200 OK + отдача HTML)  
- 14:18:33 – получение страницы с внедрённым скриптом  
- 14:20:32 – автоматический DNS-запрос к greatrecipesforme[.]com (триггер от JS)  
- 14:25:29 – TCP three-way handshake + HTTP GET к 192.0.2.17  

Признаков MitM и server-side 302-редиректа нет → чистый client-side вектор.

## IOCs
| Тип                    | Значение                                   |
|------------------------|--------------------------------------------|
| Легитимный домен/IP    | yummyrecipesforme.com / 203.0.113.22      |
| Злонамеренный домен/IP | greatrecipesforme.com / 192.0.2.17        |
| Referer chain          | yummyrecipesforme.com → greatrecipesforme.com |

## MITRE ATT&CK
- T1078 – Valid Accounts  
- T1190 – Exploit Public-Facing Application  
- T1189 – Drive-by Compromise  

## Root Cause
Использование дефолтных учётных данных → brute-force → дефейс главной страницы → внедрение вредоносного JavaScript.

## Potential Impact
- Массовый редирект посетителей на фишинг/малварь  
- Репутационный ущерб  
- Возможная компрометация пользовательских данных

## Рекомендации
1. Смена всех дефолтных паролей + политика сложности  
2. MFA на все административные аккаунты  
3. Развёртывание WAF (Cloudflare / ModSecurity + OWASP CRS)  
4. Принудительный HTTPS + HSTS + CSP  
5. File Integrity Monitoring (Wazuh, OSSEC, Tripwire)  
6. Защита от brute-force (rate-limiting, Fail2ban)

## Detection & Hunting
- Извлечённый вредоносный скрипт → [artifacts/malicious.js](artifacts/malicious.js)  
- Suricata-правило → [artifacts/driveby_redirect.sid](artifacts/driveby_redirect.sid)

## Lessons Learned
- Дефолтные учётки на публичных приложениях = мгновенный компромисс  
- Отсутствие WAF и HTTPS делает дефейс тривиальным  
- Client-side атаки требуют защиты на уровне веб-приложения, а не только сети

**Аналитик:** dedinkorea  
**Дата:** декабрь 2025  
**TLP:** WHITE
