CREATE DATABASE book_store;
DROP DATABASE book_store;

-- DELIMITER |

-- CREATE FUNCTION bin_to_uuid(b BINARY(16))
-- RETURNS CHAR(36) DETERMINISTIC
-- BEGIN
--   DECLARE HEX CHAR(32);
--   SET HEX = HEX(b);
--   RETURN LOWER(CONCAT(LEFT(HEX, 8), '-', MID(HEX, 9,4), '-', MID(HEX, 13,4), '-', MID(HEX, 17,4), '-', RIGHT(HEX, 12)));
-- END
-- |

-- CREATE FUNCTION uuid_to_bin(s CHAR(36))
-- RETURNS BINARY(16) DETERMINISTIC
-- RETURN UNHEX(CONCAT(LEFT(s, 8), MID(s, 10, 4), MID(s, 15, 4), MID(s, 20, 4), RIGHT(s, 12)))
-- |

-- DELIMITER ;