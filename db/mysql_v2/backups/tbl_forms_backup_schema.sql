CREATE TABLE `forms` (
  `f_id` tinyint NOT NULL,
  `form_name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`f_id`),
  UNIQUE KEY `idx_forms_form_name` (`form_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
