create view family_fork_stages as
with branchedEvos as (
		select *
		from pokemon_go.pokemon
		where branch = 2
)
, branchingFams as (
		select *
		from branchedEvos
		inner join families
		using (family_id)
)
, firstBranchStage as (
		select *
		, min(stage_id) over(partition by family_id) as first_branch_stage
		from branchingFams
)
, forkStageIds as (
		select distinct family_id, family_name, first_branch_stage -1 as fork_stage_id
		from firstBranchStage
)
, result as (
	select f.family_id, family_name, fork_stage_id, pokemon_name as fork_stage_pokemon_name
  from forkStageIds f
  left join pokemon p
  on (f.family_id = p.family_id and f.fork_stage_id = p.stage_id)
)
select * from result;