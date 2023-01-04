SELECT p.name FROM people p
    JOIN stars s ON (s.person_id = p.id)
    WHERE s.movie_id in (SELECT m.id FROM movies m
        JOIN stars s ON (s.movie_id = m.id)
        JOIN people p ON (p.id = s.person_id)
        WHERE p.birth = 1958 AND p.name = 'Kevin Bacon')
    AND p.id NOT IN (SELECT p.id FROM people WHERE p.name = 'Kevin Bacon' AND p.birth = 1958);
