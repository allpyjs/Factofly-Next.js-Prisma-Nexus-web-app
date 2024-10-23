insert into "user" (uuid, first_name, last_name, email, role, last_active, email_verified, language, locale, referral, login_count) values (
	gen_random_uuid(),
	'{firstname}', '{lastname}', '{email}',
	'ADMIN', now(), true, 'EN', 'da-DK', null, 0);


insert into job_type (uuid, name_en, name_da) values (gen_random_uuid(), 'Developer', 'Udvikler');
insert into country (id, uuid, code, name_en, name_da) values (60, gen_random_uuid(), 'DK', 'Denmark', 'Danmark');
