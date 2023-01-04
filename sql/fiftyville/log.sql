-- Keep a log of any SQL queries you execute as you solve the mystery.
-- Searching the crimes that happened that day
SELECT * FROM crime_scene_reports WHERE year = 2020 AND day = 28 AND month = 7 AND street LIKE "%Chamberlin%";
-- It was said there were reports talking about the courthouse
SELECT * FROM interviews WHERE year = 2020 AND day = 28 AND month = 7 AND transcript LIKE "%courthouse%";
-- Seeing the courthouse security logs for cars exiting it
SELECT * FROM courthouse_security_logs WHERE hour = 10 AND  year = 2020 AND day = 28 AND month = 7 AND activity = 'exit';
-- The thief was withdrawing money before the robbery
SELECT * FROM atm_transactions WHERE year = 2020 AND day = 28 AND month = 7 AND transaction_type = 'withdraw' AND atm_location LIKE "%Fifer%";
-- Getting the name, plate and phone number of everybody that used the ATM around that time
SELECT p.id, p.name, p.license_plate, p.phone_number FROM people p JOIN bank_accounts b ON (b.person_id = p.id) JOIN atm_transactions a ON (a.account_number = b.account_number) WHERE a.year = 2020 AND a.day = 28 AND a.month = 7 AND a.transaction_type = 'withdraw' AND a.atm_location LIKE "%Fifer%";
-- Ernest (the one who robbed) id = 686048, phone_number = (367) 555-5533, license_plate = 94KL13X (The same of the car at the courthouse)
SELECT * FROM phone_calls WHERE year = 2020 AND day = 28 AND month = 7 AND duration <= 60 AND caller = '(367) 555-5533';
-- Receiver phone number = (375) 555-8161;
SELECT * FROM people WHERE phone_number = '(375) 555-8161';
-- Berthold (the accomplice) id = 864400, phone_number = (375) 555-8161, license_plate = 4V16VO0;
SELECT * FROM airports WHERE city LIKE "%fiftyville%";
-- CSF airport id = 8
SELECT * FROM flights WHERE origin_airport_id = 8 AND year = 2020 AND day = 29 AND month = 7;
-- The earliest flight goes at 8:20 and the destination_airport_id is 4
SELECT * FROM airports WHERE id = 4;
-- The robber went to he Heathrow Airport in London