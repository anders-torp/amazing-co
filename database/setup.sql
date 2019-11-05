CREATE TABLE tree (
 id INT AUTO_INCREMENT PRIMARY KEY,
 parent INT,
 leftChild INT,
 rightSibling INT
)
  ENGINE = INNODB;

INSERT INTO tree (id, leftChild) VALUES (1, 2);
INSERT INTO tree (id, parent, leftChild, rightSibling) VALUES (2,1,null,3);
INSERT INTO tree (id, parent, leftChild, rightSibling) VALUES (3,1,null,4);
INSERT INTO tree (id, parent, leftChild, rightSibling) VALUES (4,1,null,null);