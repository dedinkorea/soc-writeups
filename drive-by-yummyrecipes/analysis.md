# Подробный анализ инцидента: Drive-by Compromise

## Описание инцидента
Легитимный сайт yummyrecipesforme[.]com был скомпрометирован через успешный brute-force административной панели (учётные данные по умолчанию admin/admin).  
Атакующий модифицировал главную страницу, внедрив вредоносный JavaScript, который выполняет client-side редирект на контролируемый злоумышленником домен greatrecipesforme[.]com.

## Индикаторы компрометации (IOCs)

| Тип                       | Значение                                      |
|---------------------------|-----------------------------------------------|
| Легитимный домен          | yummyrecipesforme.com → 203.0.113.22         |
| Злонамеренный домен       | greatrecipesforme.com → 192.0.2.17           |
| IP легитимного сервера    | 203.0.113.22                                  |
| IP злонамеренного сервера | 192.0.2.17                                    |
| Протоколы                 | DNS (53/udp), HTTP (80/tcp)                   |
| TLS/HTTPS                 | Отсутствует                                   |
| User-Agent                | Mozilla/5.0 (Windows NT 10.0; Win64; x64…)    |
| Referer chain             | yummyrecipesforme.com → greatrecipesforme.com |

## Хронология событий

| Время     | Событие                                                                 |
|-----------|-------------------------------------------------------------------------|
| 14:18:32  | HTTP GET → yummyrecipesforme.com (200 OK)                               |
| 14:18:33  | Сервер отдаёт HTML с внедрённым `<script>`                              |
| 14:20:32  | Браузер выполняет JS → DNS-запрос к greatrecipesforme.com               |
| 14:25:29  | TCP three-way handshake + HTTP GET к greatrecipesforme.com             |

**Вывод по трафику:**  
Перенаправление реализовано полностью на стороне клиента.  
Признаков локального MitM (ARP/DNS-spoofing) нет.

## Соответствие MITRE ATT&CK
- T1078 – Valid Accounts  
- T1190 – Exploit Public-Facing Application  
- T1189 – Drive-by Compromise  
- T1566 – Phishing (вероятно конечная цель)

## Root Cause
Успешный brute-force административной панели из-за дефолтных учётных данных → дефейс сайта → внедрение вредоносного JavaScript → client-side редирект жертв.

## Рекомендации по устранению и предотвращению
1. Смена всех дефолтных учётных данных + политика сложных паролей (≥16 символов)  
2. Включение MFA/2FA на все административные аккаунты  
3. Развёртывание WAF (Cloudflare, ModSecurity + OWASP CRS)  
4. Принудительный HTTPS + HSTS + Content-Security-Policy  
5. Мониторинг целостности файлов (Wazuh, OSSEC, Tripwire)  
6. Защита от brute-force (Fail2ban, rate-limiting, Cloudflare Firewall Rules)  
7. Subresource Integrity (SRI) для внешних скриптов

## Detection & Hunting
```yaml
# Sigma / Suricata правило
alert http any any -> any any (
  msg:"Suspicious JS redirect to external domain";
  content:"location.href"; nocase;
  content:"http"; distance:0; within:100;
  classtype:web-application-attack;
  sid:9000001; rev:1;
)

**Аналитик:** dedinkorea  
**Дата:** декабрь 2025  
**TLP:** WHITE
