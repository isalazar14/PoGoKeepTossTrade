drop procedure if exists strToRows;

delimiter //

create procedure strToRows(in tableName varchar(64), in delim varchar(3), in skipBlanks boolean, in str varchar(65535))
deterministic
begin

set @dropTemp = concat("drop temporary table if exists ", tableName, ";");
prepare dropTemp from @dropTemp;
execute dropTemp;
deallocate prepare dropTemp;

set @delimLen = length(delim);

set @s = concat("create temporary table ", tableName, " (n int primary key, val varchar (65535))
with recursive
vals as (
	select 	
					@n := 1 as n
				, @curVal := trim(substring_index('", str,"', '", delim, "', 1)) as val
        , @shiftLen := length(@curVal) + ", @delimLen, " + 1 as shiftLen
				, substring('", str,"', @shiftLen) as nextStr
	union all
  select 	@n := n+1 as n
				, @curVal := trim(substring_index(nextStr, '", delim, "', 1)) as val
        , @shiftLen := length(@curVal) + ", @delimLen, " + 1 as shiftLen
				, substring(nextStr, @shiftLen) as nextStr
  from vals where n = @n and trim(nextStr) != '' and trim(nextStr) != '", delim,"'
)
select n, val from vals", if(skipBlanks = true, " where val != ''", ''),";"
);

prepare stmt1 from @s;
# execute stmt1 using @tableName;
execute stmt1 ;
deallocate prepare stmt1;

end //
delimiter ;
