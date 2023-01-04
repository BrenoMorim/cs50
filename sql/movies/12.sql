SELECT m.title from movies m WHERE
m.id in
(SELECT m.id from MOVIES m JOIN stars s ON (s.movie_id = m.id) JOIN people p ON (p.id = s.person_id) WHERE p.name = 'Johnny Depp')
AND
m.id in (SELECT m.id from MOVIES m JOIN stars s ON (s.movie_id = m.id) JOIN people p ON (p.id = s.person_id) WHERE p.name = 'Helena Bonham Carter');