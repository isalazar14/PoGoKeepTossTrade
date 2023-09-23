// To parse this data:
//
//   import { Convert } from "./file";
//
//   const gameMasterEntry = Convert.toGameMasterEntry(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export type GameMaster = GameMasterEntry[]

export type GameMasterEntry = {
    templateId: string;
    data:       Data;
}

export type Data = {
    templateId:                            string;
    addressablePokemonSettings?:           AddressablePokemonSettings;
    addressBookImportSettings?:            AddressBookImportSettings;
    obAdvancedSettings?:                   ObAdvancedSettings;
    arTelemetrySettings?:                  ArTelemetrySettings;
    obAssetRefreshSettings?:               ObAssetRefreshSettings;
    avatarGroupOrderSettings?:             AvatarGroupOrderSettings;
    avatarCustomization?:                  AvatarCustomization;
    levelUpRewardSettings?:                LevelUpRewardSettings;
    backgroundModeSettings?:               BackgroundModeSettings;
    badgeSettings?:                        BadgeSettings;
    battleHubBadgeSettings?:               BattleHubBadgeSettings;
    battleHubOrderSettings?:               BattleHubOrderSettings;
    battlePartySettings?:                  BattlePartySettings;
    battleSettings?:                       { [key: string]: number };
    obBattleVisualSettings?:               ObBattleVisualSettings;
    belugaPokemonWhitelist?:               BelugaPokemonWhitelist;
    obGameMasterSettings13?:               ExternalAddressableAssetsSettings;
    buddyActivitySettings?:                BuddyActivitySettings;
    buddyActivityCategorySettings?:        BuddyActivityCategorySettings;
    buddyEmotionLevelSettings?:            BuddyEmotionLevelSettings;
    buddyEncounterCameoSettings?:          BuddyEncounterCameoSettings;
    buddyHungerSettings?:                  BuddyHungerSettings;
    buddyInteractionSettings?:             BuddyInteractionSettings;
    buddyLevelSettings?:                   BuddyLevelSettings;
    buddySwapSettings?:                    BuddySwapSettings;
    buddyWalkSettings?:                    BuddyWalkSettings;
    butterflyCollectorSettings?:           ButterflyCollectorSettings;
    obCampfireSettings?:                   ObCampfireSettings;
    obCatchRadiusMultiplierSettings?:      ObCatchRadiusMultiplierSettings;
    evolutionQuestTemplate?:               EvolutionQuestTemplate;
    invasionNpcDisplaySettings?:           InvasionNpcDisplaySettings;
    combatCompetitiveSeasonSettings?:      CombatCompetitiveSeasonSettings;
    combatLeague?:                         CombatLeague;
    combatLeagueSettings?:                 CombatLeagueSettings;
    combatType?:                           CombatType;
    combatRankingProtoSettings?:           CombatRankingProtoSettings;
    combatSettings?:                       CombatSettings;
    combatStatStageSettings?:              CombatStatStageSettings;
    combatMove?:                           CombatMove;
    obContestSettings?:                    ObContestSettings;
    obConversationSettings?:               ExternalAddressableAssetsSettings;
    crossGameSocialSettings?:              CrossGameSocialSettings;
    obDailyAdventureIncenseSettings?:      ObDailyAdventureIncenseSettings;
    deepLinkingSettings?:                  DeepLinkingSettings;
    obEggHatchImprovementSettings?:        ObEggHatchImprovementSettings;
    eggTransparencySettings?:              EggTransparencySettings;
    friendProfileSettings?:                FriendProfileSettings;
    encounterSettings?:                    EncounterSettings;
    pokemonHomeEnergyCosts?:               PokemonHomeEnergyCosts;
    obEvolutionChainDisplaySettings?:      ObEvolutionChainDisplaySettings;
    obEvolvePreviewSettings?:              ObEvolvePreviewSettings;
    obGameMasterSettings16?:               ObGameMasterSettings16;
    pokemonExtendedSettings?:              PokemonExtendedSettings;
    externalAddressableAssetsSettings?:    ExternalAddressableAssetsSettings;
    exRaidSettings?:                       ExRAIDSettings;
    obFeatureUnlockSettings?:              ObFeatureUnlockSettings;
    obFormsRefactorSettings?:              ObFormsRefactorSettings;
    formSettings?:                         FormSettings;
    obFortPowerUpSettings?:                ObFortPowerUpSettings;
    friendshipMilestoneSettings?:          FriendshipMilestoneSettings;
    geotargetedQuestSettings?:             GeotargetedQuestSettings;
    obGiftingSettings?:                    ObGiftingSettings;
    guiSearchSettings?:                    GUISearchSettings;
    gymBadgeSettings?:                     GymBadgeSettings;
    gymLevel?:                             GymLevel;
    obGameMasterLanguageSettings?:         ObGameMasterLanguageSettings;
    iapCategoryDisplay?:                   IapCategoryDisplay;
    iapSettings?:                          IapSettings;
    incidentPrioritySettings?:             IncidentPrioritySettings;
    obInvasionCharacterSettings?:          ObInvasionCharacterSettings;
    obIncubatorFlowSettings?:              ObIncubatorFlowSettings;
    pokestopInvasionAvailabilitySettings?: PokestopInvasionAvailabilitySettings;
    inventorySettings?:                    InventorySettings;
    itemSettings?:                         ItemSettings;
    itemInventoryUpdateSettings?:          ItemInventoryUpdateSettings;
    obLanguageSelectorSettings?:           ObLanguageSelectorSettings;
    obLocationCardSettings?:               ObLocationCardSettings;
    loadingScreenSettings?:                LoadingScreenSettings;
    obLocationCardFeatureSettings?:        ObSettings;
    limitedPurchaseSkuSettings?:           LimitedPurchaseSkuSettings;
    luckyPokemonSettings?:                 LuckyPokemonSettings;
    mapDisplaySettings?:                   MapDisplaySettings;
    obInteractionRangeSettings?:           ObInteractionRangeSettings;
    obMegaLevelSettings?:                  ObMegaLevelSettings;
    megaEvoSettings?:                      MegaEvoSettings;
    monodepthSettings?:                    MonodepthSettings;
    obGameMasterSettings15?:               ObGameMasterSettings15;
    newsFeedClientSettings?:               NewsFeedClientSettings;
    onboardingSettings?:                   OnboardingSettings;
    onboardingV2Settings?:                 OnboardingV2Settings;
    partyRecommendationSettings?:          PartyRecommendationSettings;
    obPhotoSettings?:                      ObPhotoSettings;
    platypusRolloutSettings?:              PlatypusRolloutSettings;
    playerLevel?:                          PlayerLevel;
    pokecoinPurchaseDisplayGmt?:           Gmt;
    obPokedexCategoriesSettings?:          ObPokedexCategoriesSettings;
    pokedexSizeStatsSettings?:             PokedexSizeStatsSettings;
    obPokemonFxSettings?:                  ObPokemonFxSettings;
    pokemonHomeSettings?:                  PokemonHomeSettings;
    pokemonScaleSettings?:                 PokemonScaleSettings;
    pokemonTagSettings?:                   PokemonTagSettings;
    typeEffective?:                        TypeEffective;
    pokemonUpgrades?:                      PokemonUpgrades;
    obPopupControlSettings?:               ObPopupControlSettings;
    obPostCardCollectionSettings?:         ObSettings;
    obPowerUpPoiSettings?:                 ObPowerUpPoiSettings;
    obPrimalEvoSettings?:                  ObPrimalEvoSettings;
    obPushGatewaySettings?:                ObPushGatewaySettings;
    obVpsEventSettings?:                   ObVpsEventSettings;
    questEvolutionSettings?:               QuestEvolutionSettings;
    questSettings?:                        QuestSettings;
    raidSettings?:                         RAIDSettings;
    obRaidLobbyCounterSettings?:           ObRAIDLobbyCounterSettings;
    recomendedSearchSettings?:             RecomendedSearchSettings;
    referralSettings?:                     ReferralSettings;
    obRemoteRaidLimitSettings?:            ObRemoteRAIDLimitSettings;
    routeCreationSettings?:                RouteCreationSettings;
    routeDiscoverySettings?:               RouteDiscoverySettings;
    routePlaySettings?:                    RoutePlaySettings;
    obRouteStampCategorySettings?:         ObRouteStampCategorySettings;
    obSharedMoveSettings?:                 ObSharedMoveSettings;
    smeargleMovesSettings?:                SmeargleMovesSettings;
    genderSettings?:                       GenderSettings;
    sponsoredGeofenceGiftSettings?:        SponsoredGeofenceGiftSettings;
    stickerMetadata?:                      StickerMetadata;
    iapItemDisplay?:                       IapItemDisplay;
    obStyleShopSettings?:                  ObStyleShopSettings;
    obInAppSurveySettings?:                ObInAppSurveySettings;
    tappableSettings?:                     TappableSettings;
    temporaryEvolutionSettings?:           TemporaryEvolutionSettings;
    obTicketGiftingSettings?:              ObTicketGiftingSettings;
    combatNpcTrainer?:                     CombatNpcTrainer;
    combatNpcPersonality?:                 CombatNpcPersonality;
    pokemonFamily?:                        PokemonFamily;
    pokemonSettings?:                      PokemonSettings;
    moveSettings?:                         MoveSettings;
    pokemonHomeFormReversions?:            PokemonHomeFormReversions;
    obVerboseCombatSetting?:               ObVerboseCombatSetting;
    obVerboseRaidSettings?:                { [key: string]: boolean };
    vsSeekerClientSettings?:               VsSeekerClientSettings;
    vsSeekerLoot?:                         VsSeekerLoot;
    vsSeekerPokemonRewards?:               VsSeekerPokemonRewards;
    obVsSeekerScheduleSettings?:           ObVsSeekerScheduleSettings;
    weatherAffinities?:                    WeatherAffinities;
    weatherBonusSettings?:                 WeatherBonusSettings;
    adventureSyncV2Gmt?:                   Gmt;
    camera?:                               DataCamera;
    obImpressionTrackingSettings?:         ObImpressionTrackingSettings;
    moveSequenceSettings?:                 MoveSequenceSettings;
    obStickerCategorySettings?:            ObStickerCategorySettings;
    obTutorialSettings?:                   ObTutorialSettings;
    obUsernameSuggestionSettings?:         ObUsernameSuggestionSettings;
}

export type AddressBookImportSettings = {
    isEnabled:               boolean;
    onboardingScreenLevel:   number;
    showOptOutCheckbox:      boolean;
    repromptOnboardingForV1: boolean;
}

export type AddressablePokemonSettings = {
    obAddressablePokemonId: string[];
}

export type Gmt = {
    featureEnabled: boolean;
}

export type ArTelemetrySettings = {
    measureBattery:              boolean;
    batterySamplingIntervalMs:   number;
    measureFramerate:            boolean;
    framerateSamplingIntervalMs: number;
    percentageSessionsToSample:  number;
}

export type AvatarCustomization = {
    enabled?:               boolean;
    avatarType?:            AvatarType;
    slot:                   Slot[];
    bundleName?:            string;
    assetName:              string;
    groupName:              Name;
    sortOrder:              number;
    unlockType:             UnlockType;
    iapSku?:                string;
    iconName?:              string;
    obStyleShopV2SetNames?: string[];
    unlockBadgeType?:       string;
    unlockBadgeLevel?:      number;
    unlockPlayerLevel?:     number;
    setPrimeItem?:          boolean;
}

export enum AvatarType {
    PlayerAvatarFemale = "PLAYER_AVATAR_FEMALE",
}

export enum Name {
    GroupBackpack = "group_backpack",
    GroupBelt = "group_belt",
    GroupEyes = "group_eyes",
    GroupFace = "group_face",
    GroupGlasses = "group_glasses",
    GroupGloves = "group_gloves",
    GroupHair = "group_hair",
    GroupHalloween = "group_halloween",
    GroupHat = "group_hat",
    GroupNecklace = "group_necklace",
    GroupOutfits = "group_outfits",
    GroupPants = "group_pants",
    GroupPoses = "group_poses",
    GroupSeasonal = "group_seasonal",
    GroupShirt = "group_shirt",
    GroupShoes = "group_shoes",
    GroupSkin = "group_skin",
    GroupSocks = "group_socks",
    GroupSponsor = "group_sponsor",
    GroupUniqlo = "group_uniqlo",
}

export enum Slot {
    Backpack = "BACKPACK",
    Belt = "BELT",
    Eyes = "EYES",
    Face = "FACE",
    Glasses = "GLASSES",
    Gloves = "GLOVES",
    Hair = "HAIR",
    Hat = "HAT",
    Necklace = "NECKLACE",
    Pants = "PANTS",
    Pose = "POSE",
    Shirt = "SHIRT",
    Shoes = "SHOES",
    Skin = "SKIN",
    Socks = "SOCKS",
}

export enum UnlockType {
    Default = "DEFAULT",
    IapClothing = "IAP_CLOTHING",
    LevelReward = "LEVEL_REWARD",
}

export type AvatarGroupOrderSettings = {
    group: Group[];
}

export type Group = {
    name:          Name;
    order:         number;
    obShowNewTag?: boolean;
}

export type BackgroundModeSettings = {
    weeklyFitnessGoalLevel1DistanceKm:   number;
    weeklyFitnessGoalLevel2DistanceKm:   number;
    weeklyFitnessGoalLevel3DistanceKm:   number;
    weeklyFitnessGoalLevel4DistanceKm:   number;
    obWeeklyFitnessGoalLevel5DistanceKm: number;
}

export type BadgeSettings = {
    badgeType:   number | string;
    badgeRank:   number;
    targets:     number[];
    eventBadge?: boolean;
}

export type BattleHubBadgeSettings = {
    combatHubDisplayedBadges: string[];
}

export type BattleHubOrderSettings = {
    section:      Section[];
    sectionGroup: SectionGroup[];
}

export type Section = {
    mainSection: string;
    subsection:  string[];
}

export type SectionGroup = {
    section: string[];
}

export type BattlePartySettings = {
    enableBattlePartySaving: boolean;
    maxBattleParties:        number;
    overallPartiesCap:       number;
}

export type BelugaPokemonWhitelist = {
    maxAllowedPokemonPokedexNumber: number;
    additionalPokemonAllowed:       string[];
    costumesAllowed:                string[];
}

export type BuddyActivityCategorySettings = {
    activityCategory: number | string;
    maxPointsPerDay:  number;
}

export type BuddyActivitySettings = {
    activity:                   string;
    activityCategory:           number | string;
    maxTimesPerDay:             number;
    numPointsPerAction:         number;
    numEmotionPointsPerAction:  number;
    emotionCooldownDurationMs?: number;
}

export type BuddyEmotionLevelSettings = {
    emotionLevel:              string;
    emotionAnimation:          string;
    minEmotionPointsRequired?: number;
}

export type BuddyEncounterCameoSettings = {
    buddyWildEncounterCameoChancePercent:     number;
    buddyQuestEncounterCameoChancePercent:    number;
    buddyRaidEncounterCameoChancePercent:     number;
    buddyInvasionEncounterCameoChancePercent: number;
}

export type BuddyHungerSettings = {
    numHungerPointsRequiredForFull: number;
    decayPointsPerBucket:           number;
    millisecondsPerBucket:          string;
    cooldownDurationMs:             string;
    decayDurationAfterFullMs:       string;
}

export type BuddyInteractionSettings = {
    feedItemWhitelist: string[];
}

export type BuddyLevelSettings = {
    level:                           string;
    minNonCumulativePointsRequired?: number;
    unlockedTraits?:                 string[];
}

export type BuddySwapSettings = {
    maxSwapsPerDay:           number;
    obBuddySwapSettingsBool1: boolean;
}

export type BuddyWalkSettings = {
    kmRequiredPerAffectionPoint: number;
}

export type ButterflyCollectorSettings = {
    enabled:                    boolean;
    version:                    number;
    region:                     string[];
    dailyProgressFromInventory: number;
}

export type DataCamera = {
    interpolation:     Interpolation[];
    targetType:        TargetType[];
    easeInSpeed:       number[];
    easeOutSpeed:      number[];
    durationSeconds:   number[];
    waitSeconds:       number[];
    transitionSeconds: number[];
    angleDegree:       number[];
    angleOffsetDegree: number[];
    pitchDegree:       number[];
    pitchOffsetDegree: number[];
    rollDegree:        number[];
    distanceMeters:    number[];
    heightPercent:     number[];
    vertCtrRatio:      number[];
    nextCamera?:       string;
}

export enum Interpolation {
    CamInterpCut = "CAM_INTERP_CUT",
    CamInterpLinear = "CAM_INTERP_LINEAR",
}

export enum TargetType {
    CamTargetAttacker = "CAM_TARGET_ATTACKER",
    CamTargetAttackerDefender = "CAM_TARGET_ATTACKER_DEFENDER",
    CamTargetAttackerDefenderEdge = "CAM_TARGET_ATTACKER_DEFENDER_EDGE",
    CamTargetAttackerDefenderMirror = "CAM_TARGET_ATTACKER_DEFENDER_MIRROR",
    CamTargetAttackerDefenderWorld = "CAM_TARGET_ATTACKER_DEFENDER_WORLD",
    CamTargetAttackerEdge = "CAM_TARGET_ATTACKER_EDGE",
    CamTargetAttackerGround = "CAM_TARGET_ATTACKER_GROUND",
    CamTargetDefender = "CAM_TARGET_DEFENDER",
    CamTargetDefenderAttacker = "CAM_TARGET_DEFENDER_ATTACKER",
    CamTargetDefenderAttackerEdge = "CAM_TARGET_DEFENDER_ATTACKER_EDGE",
    CamTargetDefenderEdge = "CAM_TARGET_DEFENDER_EDGE",
    CamTargetDefenderGround = "CAM_TARGET_DEFENDER_GROUND",
    CamTargetShoulderAttackerDefender = "CAM_TARGET_SHOULDER_ATTACKER_DEFENDER",
    CamTargetShoulderAttackerDefenderMirror = "CAM_TARGET_SHOULDER_ATTACKER_DEFENDER_MIRROR",
}

export type CombatCompetitiveSeasonSettings = {
    seasonEndTimeTimestamp:      string[];
    ratingAdjustmentPercentage:  number;
    rankingAdjustmentPercentage: number;
}

export type CombatLeague = {
    title:                              string;
    enabled:                            boolean;
    pokemonCondition:                   PokemonCondition[];
    iconUrl:                            string;
    pokemonCount:                       number;
    bannedPokemon?:                     string[];
    badgeType:                          BadgeType;
    leagueType:                         LeagueType;
    allowTempEvos?:                     boolean;
    obCombatRefactorToggle?:            ObCombatRefactorToggle[];
    unlockCondition?:                   UnlockCondition[];
    battlePartyCombatLeagueTemplateId?: CombatLeagueTemplateID;
}

export enum BadgeType {
    BadgeGreatLeague = "BADGE_GREAT_LEAGUE",
    BadgeMasterLeague = "BADGE_MASTER_LEAGUE",
    BadgeUltraLeague = "BADGE_ULTRA_LEAGUE",
}

export enum CombatLeagueTemplateID {
    CombatLeagueDefaultGreat = "COMBAT_LEAGUE_DEFAULT_GREAT",
    CombatLeagueDefaultMaster = "COMBAT_LEAGUE_DEFAULT_MASTER",
    CombatLeagueDefaultUltra = "COMBAT_LEAGUE_DEFAULT_ULTRA",
    CombatLeagueVsSeekerGreat = "COMBAT_LEAGUE_VS_SEEKER_GREAT",
}

export enum LeagueType {
    Premier = "PREMIER",
    Standard = "STANDARD",
}

export enum ObCombatRefactorToggle {
    ClientCombatNullRPCGuard = "CLIENT_COMBAT_NULL_RPC_GUARD",
    ClientFastMoveFlyInClipFallBack = "CLIENT_FAST_MOVE_FLY_IN_CLIP_FALL_BACK",
    ClientReobserverCombatState = "CLIENT_REOBSERVER_COMBAT_STATE",
    ClientSwapWidgetDismiss = "CLIENT_SWAP_WIDGET_DISMISS",
    CombatRewardsInvoke = "COMBAT_REWARDS_INVOKE",
    DefensiveACKCheck = "DEFENSIVE_ACK_CHECK",
    DownstreamRedundancy = "DOWNSTREAM_REDUNDANCY",
    FastMoveAlwaysLeak = "FAST_MOVE_ALWAYS_LEAK",
    FastMoveFlyInClip = "FAST_MOVE_FLY_IN_CLIP",
    MinigameFastMoveClear = "MINIGAME_FAST_MOVE_CLEAR",
    ServerFlyInFlyOut = "SERVER_FLY_IN_FLY_OUT",
    SwapDelayTyGreil = "SWAP_DELAY_TY_GREIL",
    SwapFastMoveClear = "SWAP_FAST_MOVE_CLEAR",
}

export type PokemonCondition = {
    type:                    PokemonConditionType;
    withPokemonCpLimit?:     PokemonConditionWithPokemonCpLimit;
    pokemonCaughtTimestamp?: PokemonCaughtTimestamp;
    pokemonWhiteList?:       PokemonWhiteList;
    withPokemonType?:        WithPokemonType;
    pokemonBanList?:         PokemonBanList;
    pokemonLevelRange?:      PokemonLevelRange;
}

export type PokemonBanList = {
    pokemon: PokemonBanListPokemon[];
}

export type PokemonBanListPokemon = {
    id:     string;
    forms?: string[];
}

export type PokemonCaughtTimestamp = {
    afterTimestamp:  string;
    beforeTimestamp: string;
}

export type PokemonLevelRange = {
    maxLevel: number;
}

export type PokemonWhiteList = {
    pokemon: PokemonWhiteListPokemon[];
}

export type PokemonWhiteListPokemon = {
    id:     string;
    form?:  string;
    forms?: string[];
}

export enum PokemonConditionType {
    PokemonBanlist = "POKEMON_BANLIST",
    PokemonCaughtTimestamp = "POKEMON_CAUGHT_TIMESTAMP",
    PokemonLevelRange = "POKEMON_LEVEL_RANGE",
    PokemonWhitelist = "POKEMON_WHITELIST",
    WithPokemonCpLimit = "WITH_POKEMON_CP_LIMIT",
    WithPokemonType = "WITH_POKEMON_TYPE",
    WithUniquePokemon = "WITH_UNIQUE_POKEMON",
}

export type PokemonConditionWithPokemonCpLimit = {
    maxCp: number;
}

export type WithPokemonType = {
    pokemonType: TypeElement[];
}

export enum TypeElement {
    PokemonTypeBug = "POKEMON_TYPE_BUG",
    PokemonTypeDark = "POKEMON_TYPE_DARK",
    PokemonTypeDragon = "POKEMON_TYPE_DRAGON",
    PokemonTypeElectric = "POKEMON_TYPE_ELECTRIC",
    PokemonTypeFairy = "POKEMON_TYPE_FAIRY",
    PokemonTypeFighting = "POKEMON_TYPE_FIGHTING",
    PokemonTypeFire = "POKEMON_TYPE_FIRE",
    PokemonTypeFlying = "POKEMON_TYPE_FLYING",
    PokemonTypeGhost = "POKEMON_TYPE_GHOST",
    PokemonTypeGrass = "POKEMON_TYPE_GRASS",
    PokemonTypeGround = "POKEMON_TYPE_GROUND",
    PokemonTypeIce = "POKEMON_TYPE_ICE",
    PokemonTypeNormal = "POKEMON_TYPE_NORMAL",
    PokemonTypePoison = "POKEMON_TYPE_POISON",
    PokemonTypePsychic = "POKEMON_TYPE_PSYCHIC",
    PokemonTypeRock = "POKEMON_TYPE_ROCK",
    PokemonTypeSteel = "POKEMON_TYPE_STEEL",
    PokemonTypeWater = "POKEMON_TYPE_WATER",
}

export type UnlockCondition = {
    type:                PokemonConditionType;
    minPokemonCount:     number;
    withPokemonCpLimit?: UnlockConditionWithPokemonCpLimit;
}

export type UnlockConditionWithPokemonCpLimit = {
    minCp: number;
    maxCp: number;
}

export type CombatLeagueSettings = {
    combatLeagueTemplateId: CombatLeagueTemplateID[];
}

export type CombatMove = {
    uniqueId:       number | string;
    type:           TypeElement;
    power?:         number;
    vfxName:        string;
    energyDelta?:   number;
    buffs?:         Buffs;
    durationTurns?: number;
}

export type Buffs = {
    targetDefenseStatStageChange?:   number;
    buffActivationChance:            number;
    attackerAttackStatStageChange?:  number;
    targetAttackStatStageChange?:    number;
    attackerDefenseStatStageChange?: number;
}

export type CombatNpcPersonality = {
    personalityName:        string;
    superEffectiveChance:   number;
    specialChance:          number;
    offensiveMinimumScore:  number;
    offensiveMaximumScore:  number;
    defensiveMinimumScore?: number;
    defensiveMaximumScore?: number;
}

export type CombatNpcTrainer = {
    trainerName:            string;
    combatLeagueTemplateId: CombatLeagueTemplateID;
    combatPersonalityId:    string;
    avatar:                 CombatNpcTrainerAvatar;
    availablePokemon:       CombatNpcTrainerAvailablePokemon[];
    trainerTitle:           string;
    trainerQuote:           string;
    iconUrl:                string;
    backdropImageBundle:    BackdropImageBundle;
}

export type CombatNpcTrainerAvailablePokemon = {
    pokemonType:     string;
    pokemonDisplay?: PokemonDisplay;
}

export type PokemonDisplay = {
    form: string;
}

export type CombatNpcTrainerAvatar = {
    avatar: number;
}

export enum BackdropImageBundle {
    CombatBlancheBackdrop = "combat_blanche_backdrop",
    CombatCandelaBackdrop = "combat_candela_backdrop",
    CombatSparkBackdrop = "combat_spark_backdrop",
}

export type CombatRankingProtoSettings = {
    rankLevel:              RankLevel[];
    requiredForRewards:     RequiredForRewards;
    minRankToDisplayRating: number;
    minRatingRequired?:     number;
}

export type RankLevel = {
    rankLevel:                       number;
    additionalTotalBattlesRequired?: number;
    additionalWinsRequired?:         number;
    minRatingRequired?:              number;
}

export type RequiredForRewards = {
    rankLevel:                      number;
    additionalTotalBattlesRequired: number;
}

export type CombatSettings = {
    roundDurationSeconds:                    number;
    turnDurationSeconds:                     number;
    minigameDurationSeconds:                 number;
    sameTypeAttackBonusMultiplier:           number;
    fastAttackBonusMultiplier:               number;
    chargeAttackBonusMultiplier:             number;
    defenseBonusMultiplier:                  number;
    minigameBonusBaseMultiplier:             number;
    minigameBonusVariableMultiplier:         number;
    maxEnergy:                               number;
    defenderMinigameMultiplier:              number;
    changePokemonDurationSeconds:            number;
    minigameSubmitScoreDurationSeconds:      number;
    quickSwapCooldownDurationSeconds:        number;
    chargeScoreBase:                         number;
    chargeScoreNice:                         number;
    chargeScoreGreat:                        number;
    chargeScoreExcellent:                    number;
    superEffectiveFlyoutDurationTurns:       number;
    notVeryEffectiveFlyoutDurationTurns:     number;
    blockedEffectiveFlyoutDurationTurns:     number;
    normalEffectiveFlyoutDurationTurns:      number;
    shadowPokemonAttackBonusMultiplier:      number;
    shadowPokemonDefenseBonusMultiplier:     number;
    purifiedPokemonAttackMultiplierVsShadow: number;
    obCombatSettingsBool1:                   boolean;
    obCombatSettingsNotPushedBool2:          boolean;
    obCombatSettings1:                       ObCombatSettings1;
    obCombatSettings2:                       ObCombatSettings2;
    obCombatSettingsNumber1:                 number;
}

export type ObCombatSettings1 = {
    obCombatSettings1Number1: number;
    enabled:                  boolean;
}

export type ObCombatSettings2 = {
    obCombatSettings2Bool1: boolean;
}

export type CombatStatStageSettings = {
    minimumStatStage:      number;
    maximumStatStage:      number;
    attackBuffMultiplier:  number[];
    defenseBuffMultiplier: number[];
}

export type CombatType = {
    type:                    TypeElement;
    niceLevelThreshold:      number;
    greatLevelThreshold:     number;
    excellentLevelThreshold: number;
}

export type CrossGameSocialSettings = {
    onlineStatusEnabledOverrideLevel:   boolean;
    nianticProfileEnabledOverrideLevel: boolean;
}

export type DeepLinkingSettings = {
    minPlayerLevelForExternalLink:     number;
    minPlayerLevelForNotificationLink: number;
    obExternalAction:                  string[];
    obNotificationAction:              string[];
    obDeepLinkingSettingBool1:         boolean;
}

export type EggTransparencySettings = {
    enableEggDistribution: boolean;
}

export type EncounterSettings = {
    spinBonusThreshold:        number;
    excellentThrowThreshold:   number;
    greatThrowThreshold:       number;
    niceThrowThreshold:        number;
    milestoneThreshold:        number;
    arPlusModeEnabled:         boolean;
    arCloseProximityThreshold: number;
    arLowAwarenessThreshold:   number;
}

export type EvolutionQuestTemplate = {
    questTemplateId: string;
    questType:       string;
    goals:           Goal[];
    context:         Context;
    display:         Display;
}

export enum Context {
    EvolutionQuest = "EVOLUTION_QUEST",
}

export type Display = {
    description: string;
    title:       string;
}

export type Goal = {
    target:     number;
    condition?: Condition[];
}

export type Condition = {
    type:             string;
    withPokemonType?: WithPokemonType;
    withThrowType?:   WithThrowType;
}

export type WithThrowType = {
    throwType: string;
}

export type ExRAIDSettings = {
    minimumExRaidShareLevel: string;
    undefinedExRaidSetting:  number;
}

export type ExternalAddressableAssetsSettings = {
}

export type FormSettings = {
    pokemon: string;
    forms?:  Form[];
}

export type Form = {
    form?:              number | string;
    assetBundleSuffix?: string;
    isCostume?:         boolean;
    assetBundleValue?:  number;
}

export type FriendProfileSettings = {
    enableSwiping: boolean;
}

export type FriendshipMilestoneSettings = {
    milestoneXpReward:     number;
    attackBonusPercentage: number;
    unlockedTrading:       string[];
    minPointsToReach?:     number;
    raidBallBonus?:        number;
    tradingDiscount?:      number;
}

export type GenderSettings = {
    pokemon: string;
    gender:  GenderClass;
}

export type GenderClass = {
    malePercent?:       number;
    femalePercent?:     number;
    genderlessPercent?: number;
}

export type GeotargetedQuestSettings = {
    enableGeotargetedQuests: boolean;
}

export type GUISearchSettings = {
    guiSearchEnabled:          boolean;
    maxNumberRecentSearches:   number;
    maxNumberFavoriteSearches: number;
    maxQueryLength:            number;
}

export type GymBadgeSettings = {
    target:                          number[];
    battleWinningScorePerDefenderCp: number;
    gymDefendingScorePerMinute:      number;
    berryFeedingScore:               number;
    pokemonDeployScore:              number;
    raidBattleWinningScore:          number;
    loseAllBattlesScore:             number;
}

export type GymLevel = {
    requiredExperience: number[];
    leaderSlots:        number[];
    trainerSlots:       number[];
}

export type IapCategoryDisplay = {
    category:       string;
    sortOrder?:     number;
    imageUrl?:      string;
    description?:   string;
    bannerEnabled?: boolean;
    bannerTitle?:   string;
    name?:          string;
    displayRows?:   number;
    hidden?:        boolean;
}

export type IapItemDisplay = {
    sku:                  string;
    category:             Category;
    sortOrder?:           number;
    spriteId?:            string;
    title?:               string;
    description?:         string;
    skuEnableTime?:       Date;
    skuDisableTime?:      Date;
    skuEnableTimeUtcMs?:  string;
    skuDisableTimeUtcMs?: string;
    imageUrl?:            string;
    hidden?:              boolean;
    sale?:                boolean;
}

export enum Category {
    IapCategoryBundle = "IAP_CATEGORY_BUNDLE",
    IapCategoryFree = "IAP_CATEGORY_FREE",
    IapCategoryGlobalEventTicket = "IAP_CATEGORY_GLOBAL_EVENT_TICKET",
    IapCategoryItems = "IAP_CATEGORY_ITEMS",
    IapCategorySticker = "IAP_CATEGORY_STICKER",
    IapCategoryTransporterEnergy = "IAP_CATEGORY_TRANSPORTER_ENERGY",
    IapCategoryUpgrades = "IAP_CATEGORY_UPGRADES",
}

export type IapSettings = {
    dailyDefenderBonusPerPokemon:   number[];
    dailyDefenderBonusMaxDefenders: number;
    dailyDefenderBonusCurrency:     string[];
    minTimeBetweenClaimsMs:         string;
}

export type IncidentPrioritySettings = {
    incidentPriority: IncidentPriority[];
}

export type IncidentPriority = {
    priority:    number;
    displayType: string;
}

export type InvasionNpcDisplaySettings = {
    trainerName:            string;
    avatar:                 InvasionNpcDisplaySettingsAvatar;
    trainerTitle:           string;
    trainerQuote:           string;
    iconUrl:                string;
    backdropImageBundle?:   BackdropImageBundle;
    modelName:              string;
    tutorialOnLossString?:  string;
    isMale?:                boolean;
    obPartySelectionMusic?: ObPartySelectionMusic;
    obCombatMusic?:         ObCombatMusic;
}

export type InvasionNpcDisplaySettingsAvatar = {
    avatar?:         number;
    skin?:           number;
    avatarHair?:     string;
    avatarShirt?:    string;
    avatarPants?:    string;
    avatarHat?:      string;
    avatarShoes?:    string;
    avatarEyes?:     AvatarEyes;
    avatarBackpack?: string;
    avatarGloves?:   string;
    avatarSocks?:    string;
    avatarBelt?:     string;
    avatarGlasses?:  string;
    avatarNecklace?: string;
    avatarPose?:     string;
    avatarFace?:     AvatarFace;
}

export enum AvatarEyes {
    AVATARFEyes1 = "AVATAR_f_eyes_1",
    AVATARFEyes3 = "AVATAR_f_eyes_3",
    AVATARMEyes3 = "AVATAR_m_eyes_3",
}

export enum AvatarFace {
    AVATARFFaceEmpty = "AVATAR_f_face_empty",
    AVATARMFaceEmpty = "AVATAR_m_face_empty",
}

export enum ObCombatMusic {
    CombatMusic = "CombatMusic",
    GoTour2022Music02 = "GoTour2022Music02",
}

export enum ObPartySelectionMusic {
    CombatLeaguePickerMusic = "CombatLeaguePickerMusic",
    QuestMusic = "QuestMusic",
}

export type InventorySettings = {
    maxPokemon:                      number;
    maxBagItems:                     number;
    basePokemon:                     number;
    baseBagItems:                    number;
    baseEggs:                        number;
    maxTeamChanges:                  number;
    teamChangeItemResetPeriodInDays: string;
    maxItemBoostDurationMs:          string;
    enableEggsNotInventory:          boolean;
    specialEggOverflowSpots:         number;
    obEnableRaidPassOverflow:        boolean;
    obBasePostcardStorage:           number;
    obMaxPostcardStorage:            number;
    obEvolutionStoneAMaxCount:       number;
    obPostcardExpansionEnabled:      boolean;
}

export type ItemInventoryUpdateSettings = {
    featureEnabled:         boolean;
    obItemCategorySettings: ObItemCategorySetting[];
}

export type ObItemCategorySetting = {
    category:     string[];
    categoryName: string;
    sortOder:     number;
}

export type ItemSettings = {
    itemId:                 string;
    itemType:               number | string;
    category:               string;
    globalEventTicket?:     GlobalEventTicket;
    dropTrainerLevel?:      number;
    ignoreInventorySpace?:  boolean;
    obItemSettingsNumber1?: number;
    food?:                  Food;
    incidentTicket?:        IncidentTicket;
    potion?:                Potion;
    incense?:               Incense;
    eggIncubator?:          EggIncubator;
    inventoryUpgrade?:      InventoryUpgrade;
    xpBoost?:               XPBoost;
    revive?:                Revive;
    stardustBoost?:         StardustBoost;
}

export type EggIncubator = {
    incubatorType:      string;
    uses?:              number;
    distanceMultiplier: number;
}

export type Food = {
    itemEffect?:              string[];
    itemEffectPercent?:       number[];
    growthPercent?:           number;
    berryMultiplier?:         number;
    remoteBerryMultiplier?:   number;
    numBuddyAffectionPoints?: number;
    mapDurationMs?:           string;
    timeFullDurationMs?:      string;
    numBuddyHungerPoints?:    number;
}

export type GlobalEventTicket = {
    eventStartTime:                Date;
    eventEndTime:                  Date;
    itemBagDescriptionKey:         string;
    clientEventStartTimeUtcMs:     string;
    clientEventEndTimeUtcMs:       string;
    eventBadge?:                   string;
    grantBadgeBeforeEventStartMs?: string;
    obIsTicketEligibleForGifting?: boolean;
    obTicketToGift?:               string;
    obTicketShopImageUrl?:         string;
    obTicket1?:                    string;
}

export type Incense = {
    incenseLifetimeSeconds: number;
    spawnTableProbability?: number;
}

export type IncidentTicket = {
    ignoreFullInventory?:     boolean;
    upgradeRequirementCount?: number;
    upgradedItem?:            string;
}

export type InventoryUpgrade = {
    additionalStorage: number;
    upgradeType:       string;
}

export type Potion = {
    staAmount?:  number;
    staPercent?: number;
}

export type Revive = {
    staPercent: number;
}

export type StardustBoost = {
    stardustMultiplier: number;
    boostDurationMs:    number;
}

export type XPBoost = {
    xpMultiplier:    number;
    boostDurationMs: number;
}

export type LevelUpRewardSettings = {
    level:              number;
    items:              string[];
    itemsCount:         number[];
    itemsUnlocked?:     string[];
    avatarTemplateIds?: string[];
}

export type LimitedPurchaseSkuSettings = {
    purchaseLimit:  number;
    chronoUnit?:    string;
    lootTableId?:   string;
    resetInterval?: number;
    version?:       number;
}

export type LoadingScreenSettings = {
    url:                     string;
    displayAfterTimestampMs: string;
    colorSettings:           ColorSettings;
}

export type ColorSettings = {
    warning_text:        string;
    progress_background: string;
    progress_bar_left:   string;
    progress_bar_right:  string;
}

export type LuckyPokemonSettings = {
    powerUpStardustDiscountPercent: number;
}

export type MapDisplaySettings = {
    showEnhancedSky: boolean;
}

export type MegaEvoSettings = {
    evolutionLengthMs:                 string;
    attackBoostFromMegaDifferentType:  number;
    attackBoostFromMegaSameType:       number;
    maxCandyHoardSize:                 number;
    enableBuddyWalkingMegaEnergyAward: boolean;
    activeMegaBonusCatchCandy:         number;
    obMegaLevelSettingsSharedBool1:    boolean;
    obMegaLevelSettingsSharedBool2:    boolean;
    obMaxMegaLevels:                   number;
    obSharedMegaEvoNumber1:            number;
    obMegaLevelEnabled:                boolean;
}

export type MonodepthSettings = {
    enableOcclusions:           boolean;
    occlusionsDefaultOn:        boolean;
    occlusionsToggleVisible:    boolean;
    enableGroundSuppression:    boolean;
    minGroundSuppressionThresh: number;
    suppressionChannelId:       number;
}

export type MoveSequenceSettings = {
    sequence: string[];
}

export type MoveSettings = {
    movementId:          number | string;
    animationId:         number;
    pokemonType:         TypeElement;
    power?:              number;
    accuracyChance:      number;
    criticalChance?:     number;
    staminaLossScalar?:  number;
    trainerLevelMin?:    number;
    trainerLevelMax?:    number;
    vfxName:             string;
    durationMs:          number;
    damageWindowStartMs: number;
    damageWindowEndMs:   number;
    energyDelta?:        number;
    healScalar?:         number;
    isLocked?:           boolean;
}

export type NewsFeedClientSettings = {
    isNewsFeedPollingEnabled:      boolean;
    getNewsFeedPollingRateMinutes: number;
}

export type ObAdvancedSettings = {
    obDownloadAllAssetsEnabled: boolean;
}

export type ObAssetRefreshSettings = {
    obCheckForNewAssetsTimeSeconds: number;
}

export type ObBattleVisualSettings = {
    obBattleVisualStadiumEnabled: boolean;
    obStadiumCrowdAsset:          string;
    obStadiumBannerAsset:         string;
}

export type ObCampfireSettings = {
    obCampfireAccessEnabled:           boolean;
    obCampfireMapButtonEnabled:        boolean;
    obCatchCardEnabled:                boolean;
    obCatchCardShareEnabled:           boolean;
    obCatchCardTimeToShareToCampfireS: number;
    obCatchCardShareToCampfireEnabled: boolean;
}

export type ObCatchRadiusMultiplierSettings = {
    obCatchRadiusMultiplierEnabled: boolean;
}

export type ObContestSettings = {
    obContestSettingsBool1:      boolean;
    obContestSettingsNumber1:    number;
    obContestIncidents:          ObContestIncident[];
    obContestSettingsNumber2:    number;
    obContestSettingsNumber3:    string;
    obContestOccurrenceSettings: ObContestOccurrenceSetting[];
    obContestSettingsNumber4:    string;
    obContestSettingsNumber5:    string;
    obContestSettingsNumber6:    number;
    obContestSettingsNumber7:    number;
    obContestTypes:              ObContestType[];
    obContestDurations:          ObContestDuration[];
}

export type ObContestDuration = {
    obDurationName:  string;
    obDurationMinMs: string;
    obDurationMaxMs: string;
}

export type ObContestIncident = {
    obContestTypeSettings:    ObContestTypeSettings;
    obContestOccurrence:      string;
    obContestIncidentNumber1: number;
}

export type ObContestTypeSettings = {
    pokemonMetric:   string;
    rankingStandard: string;
}

export type ObContestOccurrenceSetting = {
    obContestOccurrence:           string;
    obContestClaimRewardNumber1Ms: string;
    obContestClaimRewardNumber2Ms: string;
}

export type ObContestType = {
    obPokemonSize: ObPokemonSize;
}

export type ObPokemonSize = {
    obSizeSortPredicateNumber1: number;
    obSizeSortPredicateNumber2: number;
    obSizeSortPredicateNumber3: number;
}

export type ObDailyAdventureIncenseSettings = {
    enabled:                              boolean;
    obPokeballThresholdToRewardLoot:      number;
    obRewards:                            ObRewards;
    obDailyAdventureIncenseResetTime:     string;
    obDailyAdventureIncenseSettingsBool1: boolean;
    obPaceMultiplier:                     number;
}

export type ObRewards = {
    lootItem: LootItem[];
}

export type LootItem = {
    item:  string;
    count: number;
}

export type ObEggHatchImprovementSettings = {
    featureEnabled:                        boolean;
    obEggHatchAnimationDelayMs:            number;
    obEggHatchAnimationInteruptionDelayMs: number;
}

export type ObEvolutionChainDisplaySettings = {
    pokemon: string;
    obChain: ObChain[];
}

export type ObChain = {
    obEvolutionChainEntry: ObEvolutionChainEntry[];
    obPokedexHeader?:      ObPokedexHeader;
}

export type ObEvolutionChainEntry = {
    pokemon: string;
    form?:   string;
    gender?: GenderRequirementEnum;
}

export enum GenderRequirementEnum {
    Female = "FEMALE",
    Genderless = "GENDERLESS",
    Male = "MALE",
}

export enum ObPokedexHeader {
    AlolaPokedexHeader = "alola_pokedex_header",
    GalarianPokedexHeader = "galarian_pokedex_header",
    GenderFemale = "gender_female",
    GenderMale = "gender_male",
    HisuianPokedexHeader = "hisuian_pokedex_header",
}

export type ObEvolvePreviewSettings = {
    obEnableEvolutionPreview:     boolean;
    obEnableMegaEvolutionPreview: boolean;
}

export type ObFeatureUnlockSettings = {
    obBulkPostcardDeleteEnabled:    number;
    obFeatureUnlockSettingsNumber3: number;
}

export type ObFormsRefactorSettings = {
    obFormsRefactorSettingsBool1: boolean;
    obFormsRefactorSettingsBool2: boolean;
    obFormsRefactorSettingsBool3: boolean;
    obEnableSingularShadowForm:   boolean;
}

export type ObFortPowerUpSettings = {
    level:                     string;
    obPointsNeededForLevelUp?: number;
    obPowerUpReward?:          string[];
    obDurationOfPowerUpMs?:    number;
}

export type ObGameMasterLanguageSettings = {
    language:   string;
    isEnabled?: boolean;
}

export type ObGameMasterSettings15 = {
    obEnabled: boolean;
}

export type ObGameMasterSettings16 = {
    obGameMasterSettings16Bool1: boolean;
}

export type ObGiftingSettings = {
    obConvertItemsToStardustWhenFullEnabled: boolean;
    obStardustToRewardWhenFull:              number;
    stardustMultiplier:                      StardustMultiplier[];
}

export type StardustMultiplier = {
    obStardustBaseMultiplier:        number;
    obStardustMultiplierProbability: number;
}

export type ObImpressionTrackingSettings = {
    obImpressionTrackingSettingsBool1: boolean;
    obImpressionTrackingSettingsBool2: boolean;
    obImpressionTrackingSettingsBool4: boolean;
    obImpressionTrackingSettingsBool5: boolean;
    obImpressionTrackingSettingsBool6: boolean;
}

export type ObInAppSurveySettings = {
    obInAppSurveyNumber1: number;
}

export type ObIncubatorFlowSettings = {
    obIncubatorFlowSettingsBool1: boolean;
    obIncubatorFlowSettingsBool2: boolean;
}

export type ObInteractionRangeSettings = {
    interactionRangeMeters:       number;
    farInteractionRangeMeters:    number;
    remoteInteractionRangeMeters: number;
}

export type ObInvasionCharacterSettings = {
    obInvasionCharacter: string[];
}

export type ObLanguageSelectorSettings = {
    obLanguageSelectorEnabled: boolean;
}

export type ObSettings = {
    enabled: boolean;
}

export type ObLocationCardSettings = {
    locationCard: number | string;
    headerKey:    string;
}

export type ObMegaLevelSettings = {
    obMegaLevelUnlockSettings:   ObMegaLevelUnlockSettings;
    obMegaLevelCooldownSettings: ObMegaLevelCooldownSettings;
    obMegaLevelPerks:            ObMegaLevelPerks;
    pokemonId?:                  string;
    level?:                      number;
}

export type ObMegaLevelCooldownSettings = {
    durationMs:                           string;
    obMaxMegaCandyRequired:               number;
    obGameMasterSettings2Message2Number3: number;
}

export type ObMegaLevelPerks = {
    obMegaPerkAttackBoostFromMegaDifferentType: number;
    obMegaPerkAttackBoostFromMegaSameType:      number;
    obMegaPerkActiveMegaBonusCatchCandy:        number;
    obMegaPerkXpCatchBonus?:                    number;
    obMegaPerkXlCandyBonusChance?:              number;
}

export type ObMegaLevelUnlockSettings = {
    obGameMasterSettings2Message1Number2: number;
    obGameMasterSettings2Message1Number3: number;
    obMegaEvolutionsRequiredToUnlock?:    number;
}

export type ObPhotoSettings = {
    obResolutionSaveMultiplier: number;
}

export type ObPokedexCategoriesSettings = {
    featureEnabled:                   boolean;
    obSpecialCategories:              ObSpecialCategory[];
    obPokedexCategoriesSettingsBool1: boolean;
    obEnablePokedexSearch:            boolean;
}

export type ObSpecialCategory = {
    obPokedexCategory:                   string;
    obCategoryObtainedUnlockRequirement: number;
}

export type ObPokemonFxSettings = {
    obPokemonFxBool10: boolean;
}

export type ObPopupControlSettings = {
    obPopupControlSettingsBool4:  boolean;
    obPopupControlSettingsBool11: boolean;
    obPopupControlSettingsBool12: boolean;
}

export type ObPowerUpPoiSettings = {
    obMinPlayerLevelForScanning: number;
    obPointsMultiplier:          number;
}

export type ObPrimalEvoSettings = {
    obPrimalBoostSettings:          ObPrimalBoostSettings;
    obPrimalMaxCandyHoardSize:      number;
    obPrimalTypeBoostBonusSettings: ObPrimalTypeBoostBonusSetting[];
}

export type ObPrimalBoostSettings = {
    evolutionLengthMs:          string;
    obPrimalEvoSettingsNumber2: number;
    obPrimalTypeBoostEnabled:   boolean;
}

export type ObPrimalTypeBoostBonusSetting = {
    obPokemon: string;
    obTypes:   TypeElement[];
}

export type ObPushGatewaySettings = {
    obPushGatewayMinLevel1: number;
    obPushGatewayMinLevel2: number;
}

export type ObRAIDLobbyCounterSettings = {
    obRaidLobbyCounterSettingsBool1:    boolean;
    obRaidLobbyCounterSettingsNumber1:  number;
    obWebsocketRaidLobbyUpdateEnabled1: boolean;
    obRaidLobbyCounterSettingsBool3:    boolean;
    obWebsocketRaidLobbyUpdateEnabled2: boolean;
    obWebsocketRaidLobbyUpdateEnabled3: boolean;
    obRaidLobbyCounterSettingsFloat1:   number;
    obRaidLobbyCounterSettingsNumber2:  number;
    obRaidLobbyCounterSettingsNumber3:  number;
    obRaidLobbyCounterSettingsString1:  string;
    obRaidLobbyCounterSettingsFloat2:   number;
    obRaidLobbyCounterSettingsNumber4:  number;
}

export type ObRemoteRAIDLimitSettings = {
    enabled:                  boolean;
    obRemoteRaidUseableLimit: number;
}

export type ObRouteStampCategorySettings = {
    category:                      string;
    obRouteStampCategoryNumber1:   number;
    sortOrder:                     number;
    obIsRouteStampCategoryDefault: boolean;
}

export type ObSharedMoveSettings = {
    staPercent: number;
    atkPercent: number;
    defPercent: number;
    durationS:  number;
}

export type ObStickerCategorySettings = {
    enabled:           boolean;
    obStickerCategory: ObStickerCategoryClass[];
}

export type ObStickerCategoryClass = {
    category:                          string;
    sortOrder:                         number;
    obStickerCategoryEnabled:          boolean;
    obStickerCategoryIconAssetBundle?: string;
}

export type ObStyleShopSettings = {
    obTodayViewSettingsBool1:           boolean;
    obStyleShopV2Enabled:               boolean;
    obStyleShopV2PossibleFeaturedItems: string[];
}

export type ObTicketGiftingSettings = {
    minPlayerLevel:              number;
    obMaxNumberOfGiftsPerDay:    number;
    obTicketGiftSettingsString1: string;
}

export type ObTutorialSettings = {
    obTutorialSettingsBool2:  boolean;
    obTutorialSettingsBool3:  boolean;
    obTutorialSettingsBool4:  boolean;
    obTutorialSettingsBool5:  boolean;
    obTutorialSettingsBool6:  boolean;
    obTutorialSettingsBool7:  boolean;
    obTutorialSettingsBool8:  boolean;
    obTutorialSettingsBool9:  boolean;
    obTutorialSettingsBool10: boolean;
    obTutorialSettingsBool11: boolean;
    obTutorialCompleteReward: ObTutorialCompleteReward[];
}

export type ObTutorialCompleteReward = {
    obTutorial: string;
    itemReward: ItemReward[];
}

export type ItemReward = {
    itemId: string;
    amount: number;
}

export type ObUsernameSuggestionSettings = {
    obFeatureEnabled:            boolean;
    obUsernameSuggestionNumber1: number;
    obUsernameSuggestionNumber2: number;
}

export type ObVerboseCombatSetting = {
    enabled:                        boolean;
    obVerboseCombatSettingsBool1:   boolean;
    obVerboseCombatSettingsBool2:   boolean;
    obVerboseCombatSettingsBool3:   boolean;
    obVerboseCombatSettingsBool4:   boolean;
    obVerboseRaidShared1Bool8:      boolean;
    obVerboseRaidShared2Bool9:      boolean;
    obVerboseRaidShared3Bool9:      boolean;
    obVerboseRaidShared4Bool9:      boolean;
    obVerboseCombatSettingsNumber1: number;
    obVerboseCombatSettingsBool5:   boolean;
    obVerboseCombatSettingsNumber2: number;
}

export type ObVpsEventSettings = {
    fortVpsEvents: FortVpsEvent[];
}

export type FortVpsEvent = {
    fortId:      string;
    startTimeMs: string;
    endTimeMs:   string;
    vpsEvent:    VpsEvent;
}

export type VpsEvent = {
    obVpsEventAction: string;
}

export type ObVsSeekerScheduleSettings = {
    obVsSeekerScheduleSettingEnabled: boolean;
    obVsSeekerScheduleSettingBool2:   boolean;
    obVsSeekerScheduleSettingBool3:   boolean;
    obVsSeekerSchedule:               ObVsSeekerSchedule[];
}

export type ObVsSeekerSchedule = {
    obVsSeekerSeasonName:            string;
    descriptionKey:                  string;
    obVsSeekerScheduleWindowDetails: ObVsSeekerScheduleWindowDetail[];
    obVsSeekerSeasonBlogUrl:         string;
}

export type ObVsSeekerScheduleWindowDetail = {
    startTimeMs:            string;
    endTimeMs:              string;
    obVsSeekerCupsInWindow: string[];
}

export type OnboardingSettings = {
    obOnboardingSettingsNumber1: number;
}

export type OnboardingV2Settings = {
    pokedexId:       string[];
    eggKmUntilHatch: number;
}

export type PartyRecommendationSettings = {
    mode:                     string;
    variance:                 number;
    thirdMoveWeight:          number;
    megaEvoCombatRatingScale: number;
}

export type PlatypusRolloutSettings = {
    buddyV2MinPlayerLevel:          number;
    buddyMultiplayerMinPlayerLevel: number;
}

export type PlayerLevel = {
    rankNum:                      number[];
    requiredExperience:           number[];
    cpMultiplier:                 number[];
    maxEggPlayerLevel:            number;
    maxEncounterPlayerLevel:      number;
    maxQuestEncounterPlayerLevel: number;
    obMaxMegaLevel:               number;
}

export type PokedexSizeStatsSettings = {
    obPokedexSizeStatFeatureEnabled:              boolean;
    obPokemonSizeCatchRequirementToUnlockStats:   number;
    obPokemonWeightCatchRequirementToUnlockStats: number;
    obPokedexSizeStatsSettingsFloat1:             number;
    obPokedexSizeStatsSettingsBool2:              boolean;
}

export type PokemonExtendedSettings = {
    uniqueId:                    string;
    obPokemonSizeSettings:       ObPokemonSizeSetting;
    form?:                       number | string;
    obExtendedOverrideSettings?: ObExtendedOverrideSetting[];
}

export type ObExtendedOverrideSetting = {
    tempEvolutionId:       Temp;
    obPokemonSizeSettings: ObPokemonSizeSettings;
}

export type ObPokemonSizeSettings = {
    obPokemonSizeMultiplierScale1: number;
    obPokemonSizeMultiplierScale2: number;
    obPokemonSizeMultiplierScale3: number;
    obPokemonSizeMultiplierScale4: number;
    obPokemonSizeMultiplierScale5: number;
    obPokemonSizeMultiplierScale6: number;
}

export enum Temp {
    TempEvolutionMega = "TEMP_EVOLUTION_MEGA",
    TempEvolutionMegaX = "TEMP_EVOLUTION_MEGA_X",
    TempEvolutionMegaY = "TEMP_EVOLUTION_MEGA_Y",
    TempEvolutionPrimal = "TEMP_EVOLUTION_PRIMAL",
}

export type ObPokemonSizeSetting = {
    obPokemonSizeMultiplierScale1:   number;
    obPokemonSizeMultiplierScale2:   number;
    obPokemonSizeMultiplierScale3:   number;
    obPokemonSizeMultiplierScale4:   number;
    obPokemonSizeMultiplierScale5:   number;
    obPokemonSizeMultiplierScale6:   number;
    obPokemonSizeSettingsBool2?:     boolean;
    obPokemonSizeMultiplierScale7?:  number;
    obPokemonSizeMultiplierScale8?:  number;
    obPokemonSizeMultiplierScale9?:  number;
    obPokemonSizeMultiplierScale10?: number;
}

export type PokemonFamily = {
    familyId:                string;
    candyPerXlCandy:         number;
    megaEvolvablePokemonId?: string;
}

export type PokemonHomeEnergyCosts = {
    pokemonClass?: PokemonClass;
    base:          number;
    shiny:         number;
    cp1001To2000:  number;
    cp2001ToInf:   number;
}

export enum PokemonClass {
    PokemonClassLegendary = "POKEMON_CLASS_LEGENDARY",
    PokemonClassMythic = "POKEMON_CLASS_MYTHIC",
    PokemonClassUltraBeast = "POKEMON_CLASS_ULTRA_BEAST",
}

export type PokemonHomeFormReversions = {
    pokemonId:   string;
    formMapping: FormMapping[];
}

export type FormMapping = {
    revertedForm:       string;
    unauthorizedForms:  string[];
    revertedFormString: string;
}

export type PokemonHomeSettings = {
    playerMinLevel:               number;
    transporterMaxEnergy:         number;
    energySkuId:                  string;
    transporterEnergyGainPerHour: number;
}

export type PokemonScaleSettings = {
    pokemonScaleMode?: string;
    minHeight:         number;
    maxHeight:         number;
}

export type PokemonSettings = {
    pokemonId:                          string;
    modelScale?:                        number;
    type:                               TypeElement;
    type2?:                             TypeElement;
    camera:                             PokemonSettingsCamera;
    encounter:                          Encounter;
    stats:                              Stats;
    quickMoves?:                        string[];
    cinematicMoves?:                    Array<number | string>;
    animationTime?:                     number[];
    evolutionIds?:                      string[];
    evolutionPips?:                     number;
    pokedexHeightM:                     number;
    pokedexWeightKg:                    number;
    heightStdDev:                       number;
    weightStdDev:                       number;
    familyId:                           string;
    candyToEvolve?:                     number;
    kmBuddyDistance:                    number;
    modelHeight?:                       number;
    evolutionBranch?:                   EvolutionBranch[];
    modelScaleV2?:                      number;
    buddyOffsetMale?:                   number[];
    buddyOffsetFemale?:                 number[];
    buddyScale?:                        number;
    thirdMove:                          ThirdMove;
    isTransferable?:                    boolean;
    isDeployable?:                      boolean;
    isTradable?:                        boolean;
    shadow?:                            Shadow;
    buddyGroupNumber?:                  number;
    buddyWalkedMegaEnergyAward?:        number;
    raidBossDistanceOffset?:            number;
    form?:                              number | string;
    disableTransferToPokemonHome?:      boolean;
    parentPokemonId?:                   string;
    buddySize?:                         BuddySize;
    combatShoulderCameraAngle?:         number[];
    combatDefaultCameraAngle?:          number[];
    combatPlayerFocusCameraAngle?:      number[];
    eliteCinematicMove?:                Array<number | string>;
    tempEvoOverrides?:                  TempEvoOverride[];
    obCostumeEvolution?:                string[];
    eliteQuickMove?:                    Array<number | string>;
    buddyPortraitOffset?:               number[];
    combatPlayerPokemonPositionOffset?: number[];
    pokemonClass?:                      PokemonClass;
    combatOpponentFocusCameraAngle?:    number[];
    formChange?:                        FormChange[];
    obPokemonSizeSetting?:              ObPokemonSizeSetting;
}

export enum BuddySize {
    BuddyBaby = "BUDDY_BABY",
    BuddyBig = "BUDDY_BIG",
    BuddyFlying = "BUDDY_FLYING",
    BuddyShoulder = "BUDDY_SHOULDER",
}

export type PokemonSettingsCamera = {
    diskRadiusM?:       number;
    cylinderRadiusM?:   number;
    cylinderHeightM?:   number;
    shoulderModeScale?: number;
    cylinderGroundM?:   number;
}

export type Encounter = {
    collisionRadiusM?:              number;
    collisionHeightM?:              number;
    collisionHeadRadiusM?:          number;
    movementType?:                  MovementType;
    movementTimerS?:                number;
    jumpTimeS?:                     number;
    attackTimerS?:                  number;
    attackProbability?:             number;
    dodgeProbability?:              number;
    dodgeDurationS?:                number;
    dodgeDistance?:                 number;
    cameraDistance?:                number;
    minPokemonActionFrequencyS?:    number;
    maxPokemonActionFrequencyS?:    number;
    obShadowFormBaseCaptureRate?:   number;
    obShadowFormAttackProbability?: number;
    obShadowFormDodgeProbability?:  number;
    bonusCandyCaptureReward?:       number;
    bonusStardustCaptureReward?:    number;
    bonusXlCandyCaptureReward?:     number;
}

export enum MovementType {
    MovementElectric = "MOVEMENT_ELECTRIC",
    MovementFlying = "MOVEMENT_FLYING",
    MovementHovering = "MOVEMENT_HOVERING",
    MovementJump = "MOVEMENT_JUMP",
    MovementPsychic = "MOVEMENT_PSYCHIC",
}

export type EvolutionBranch = {
    evolution?:                              string;
    candyCost?:                              number;
    form?:                                   string;
    obPurificationEvolutionCandyCost?:       number;
    temporaryEvolution?:                     Temp;
    temporaryEvolutionEnergyCost?:           number;
    temporaryEvolutionEnergyCostSubsequent?: number;
    evolutionItemRequirement?:               string;
    noCandyCostViaTrade?:                    boolean;
    priority?:                               number;
    questDisplay?:                           QuestDisplay[];
    lureItemRequirement?:                    string;
    kmBuddyDistanceRequirement?:             number;
    mustBeBuddy?:                            boolean;
    onlyDaytime?:                            boolean;
    onlyNighttime?:                          boolean;
    obEvolutionBranchBool2?:                 boolean;
    genderRequirement?:                      GenderRequirementEnum;
    onlyUpsideDown?:                         boolean;
    obEvolutionStoneAItemCost?:              number;
}

export type QuestDisplay = {
    questRequirementTemplateId: string;
}

export type FormChange = {
    availableForm: string[];
    candyCost?:    number;
    stardustCost?: number;
    item?:         string;
}

export type Shadow = {
    purificationStardustNeeded: number;
    purificationCandyNeeded:    number;
    purifiedChargeMove:         PurifiedChargeMove;
    shadowChargeMove:           ShadowChargeMove;
}

export enum PurifiedChargeMove {
    AeroblastPlusPlus = "AEROBLAST_PLUS_PLUS",
    Return = "RETURN",
    SacredFirePlusPlus = "SACRED_FIRE_PLUS_PLUS",
}

export enum ShadowChargeMove {
    AeroblastPlus = "AEROBLAST_PLUS",
    Frustration = "FRUSTRATION",
    SacredFirePlus = "SACRED_FIRE_PLUS",
}

export type Stats = {
    baseStamina?: number;
    baseAttack?:  number;
    baseDefense?: number;
}

export type TempEvoOverride = {
    tempEvoId?:               Temp;
    stats?:                   Stats;
    averageHeightM?:          number;
    averageWeightKg?:         number;
    typeOverride1?:           TypeElement;
    typeOverride2?:           TypeElement;
    camera?:                  TempEvoOverrideCamera;
    modelScaleV2?:            number;
    modelHeight?:             number;
    buddyOffsetMale?:         number[];
    buddyOffsetFemale?:       number[];
    buddyPortraitOffset?:     number[];
    raidBossDistanceOffset?:  number;
    obTempEvoOverrideFloat1?: number[];
}

export type TempEvoOverrideCamera = {
    cylinderRadiusM?: number;
    cylinderHeightM:  number;
    cylinderGroundM?: number;
}

export type ThirdMove = {
    stardustToUnlock?: number;
    candyToUnlock:     number;
}

export type PokemonTagSettings = {
    minPlayerLevelForPokemonTagging: number;
    colorBinding:                    ColorBinding[];
    maxNumTagsAllowed:               number;
}

export type ColorBinding = {
    color:   string;
    hexCode: string;
}

export type PokemonUpgrades = {
    upgradesPerLevel:              number;
    allowedLevelsAbovePlayer:      number;
    candyCost:                     number[];
    stardustCost:                  number[];
    shadowStardustMultiplier:      number;
    shadowCandyMultiplier:         number;
    purifiedStardustMultiplier:    number;
    purifiedCandyMultiplier:       number;
    maxNormalUpgradeLevel:         number;
    defaultCpBoostAdditionalLevel: number;
    xlCandyMinPlayerLevel:         number;
    xlCandyCost:                   number[];
    obMaxMegaLevel:                number;
}

export type PokestopInvasionAvailabilitySettings = {
    availabilityStartMinute: number;
    availabilityEndMinute:   number;
}

export type QuestEvolutionSettings = {
    enableQuestEvolutions:        boolean;
    enableWalkingQuestEvolutions: boolean;
}

export type QuestSettings = {
    questType:  string;
    dailyQuest: DailyQuest;
}

export type DailyQuest = {
    bucketsPerDay:          number;
    streakLength:           number;
    bonusMultiplier?:       number;
    streakBonusMultiplier?: number;
}

export type RAIDSettings = {
    remoteRaidEnabled:                     boolean;
    maxRemoteRaidPasses:                   number;
    remoteDamageModifier:                  number;
    remoteRaidsMinPlayerLevel:             number;
    maxNumFriendInvites:                   number;
    friendInviteCutoffTimeSec:             number;
    canInviteFriendsInPerson:              boolean;
    canInviteFriendsRemotely:              boolean;
    maxPlayersPerLobby:                    number;
    maxRemotePlayersPerLobby:              number;
    inviteCooldownDurationMillis:          string;
    maxNumFriendInvitesPerAction:          number;
    unsupportedRaidLevelsForFriendInvites: string[];
    unsupportedRemoteRaidLevels:           string[];
    obRaidClientSetting:                   ObRAIDClientSetting[];
    obRaidClientSetting2:                  ObRAIDClientSetting2;
    obBootRaidStateEnabled:                boolean;
    obRaidClientSettingsBool2:             boolean;
    obRemotePassGpsExploitBlockingEnabled: boolean;
    obRaidClientSettingsNumber1:           number;
    obDisplayRemoteRaidPassRemainingText:  boolean;
    obRaidClientSettingsNumber2:           number;
    obRaidClientSettingsNumber3:           number;
}

export type ObRAIDClientSetting = {
    raidLevel:                  string;
    obRaidClientSettingString1: string;
}

export type ObRAIDClientSetting2 = {
    obRaidClientSettings2Bool1: boolean;
}

export type RecomendedSearchSettings = {
    searchLabel:         string;
    appendSearchString?: string;
    searchKey?:          string;
}

export type ReferralSettings = {
    featureEnabled:                          boolean;
    recentFeatures:                          RecentFeature[];
    addReferrerGracePeriodMs:                string;
    minNumDaysWithoutSessionForLapsedPlayer: number;
    obDeepLinkUrl:                           string;
    obReferralSettingsBool1:                 boolean;
}

export type RecentFeature = {
    iconType:    string;
    featureName: string;
    description: string;
}

export type RouteCreationSettings = {
    maxOpenRoutes:                    number;
    minTotalDistanceM:                number;
    maxTotalDistanceM:                number;
    maxNameLength:                    number;
    maxDescriptionLength:             number;
    minPlayerLevel:                   number;
    enabled:                          boolean;
    obRoutesCreationSettingsBool1:    boolean;
    obRoutesCreationSettingsNumber5:  number;
    obRoutesCreationSettingsNumber6:  number;
    obRoutesCreationSettingsNumber7:  number;
    obRoutesCreationSettingsFloat3:   number;
    obRoutesCreationSettingsNumber9:  number;
    obRoutesCreationSettingsNumber10: number;
    obRoutesCreationSettingsBool2:    boolean;
    obRoutesCreationSettingsMessage1: ObRoutesCreationSettingsMessage1;
}

export type ObRoutesCreationSettingsMessage1 = {
    obRouteGameMasterMessage1: number;
    obRouteGameMasterMessage2: number;
    obRouteGameMasterMessage3: number;
}

export type RouteDiscoverySettings = {
    nearbyVisibleRadiusMeters: number;
}

export type RoutePlaySettings = {
    minPlayerLevel:         number;
    routeExpirationMinutes: number;
    routePauseDistanceM:    number;
}

export type SmeargleMovesSettings = {
    quickMoves:     string[];
    cinematicMoves: string[];
}

export type SponsoredGeofenceGiftSettings = {
    giftPersistenceTimeMs:                  number;
    mapPresentationTimeMs:                  number;
    enableSponsoredGeofenceGift:            boolean;
    fullscreenDisableExitButtonTimeMs:      number;
    balloonGiftSettings:                    BalloonGiftSettings;
    obSponsoredGeofenceGiftSettingsBool1:   boolean;
    obSponsoredGeofenceGiftSettingsNumber1: number;
    obSponsoredGeofenceGiftSettingsBool2:   boolean;
    obVideoAdDetails:                       ObVideoAdDetails;
}

export type BalloonGiftSettings = {
    enableBalloonGift:        boolean;
    balloonAutoDismissTimeMs: number;
    getWasabiAdRpcIntervalMs: number;
    obIsVideoAd:              boolean;
}

export type ObVideoAdDetails = {
    obVideoAdDetailsString1: string;
    obVideoAdDetailsString2: string;
    obVideoAdDetailsString3: string;
}

export type StickerMetadata = {
    stickerId:           string;
    maxCount:            number;
    pokemonId?:          string;
    obStickerCategory:   ObStickerCategoryEnum[];
    obStickerDate:       number;
    obStickerSortOrder?: number;
    stickerUrl?:         string;
}

export enum ObStickerCategoryEnum {
    Characters = "Characters",
    Messages = "Messages",
    Misc = "Misc",
    Pokemon = "Pokemon",
    The24_7 = "24_7",
}

export type TappableSettings = {
    visibleRadiusMeters:            number;
    spawnAngleDegrees:              number;
    movementRespawnThresholdMeters: number;
    buddyFovDegress:                number;
    avgTappablesInView:             number;
}

export type TemporaryEvolutionSettings = {
    pokemonId:           string;
    temporaryEvolutions: TemporaryEvolution[];
}

export type TemporaryEvolution = {
    temporaryEvolutionId: Temp;
    assetBundleValue:     number;
}

export type TypeEffective = {
    attackScalar: number[];
    attackType:   TypeElement;
}

export type VsSeekerClientSettings = {
    allowedVsSeekerLeagueTemplateId: string[];
}

export type VsSeekerLoot = {
    rankLevel:    number;
    reward:       Reward[];
    rewardTrack?: RewardTrack;
}

export type Reward = {
    item?:                      ItemClass;
    itemRankingLootTableCount?: number;
    pokemonReward?:             boolean;
}

export type ItemClass = {
    stardust?: boolean;
    count:     number;
    item?:     ItemEnum;
}

export enum ItemEnum {
    ItemRareCandy = "ITEM_RARE_CANDY",
}

export enum RewardTrack {
    Premium = "PREMIUM",
}

export type VsSeekerPokemonRewards = {
    availablePokemon: VsSeekerPokemonRewardsAvailablePokemon[];
    rewardTrack?:     RewardTrack;
}

export type VsSeekerPokemonRewardsAvailablePokemon = {
    guaranteedLimitedPokemonReward?: GuaranteedLimitedPokemonReward;
    unlockedAtRank:                  number;
    attackIvOverride:                IvOverride;
    defenseIvOverride:               IvOverride;
    staminaIvOverride:               IvOverride;
    pokemon?:                        GuaranteedLimitedPokemonRewardPokemon;
}

export type IvOverride = {
    range: Range;
}

export type Range = {
    min: number;
    max: number;
}

export type GuaranteedLimitedPokemonReward = {
    pokemon:                             GuaranteedLimitedPokemonRewardPokemon;
    identifier:                          string;
    perCompetitiveCombatSeasonMaxCount?: number;
    lifetimeMaxCount?:                   number;
}

export type GuaranteedLimitedPokemonRewardPokemon = {
    pokemonId:       string;
    pokemonDisplay?: PokemonDisplay;
}

export type WeatherAffinities = {
    weatherCondition: string;
    pokemonType:      TypeElement[];
}

export type WeatherBonusSettings = {
    cpBaseLevelBonus:                        number;
    guaranteedIndividualValues:              number;
    stardustBonusMultiplier:                 number;
    attackBonusMultiplier:                   number;
    raidEncounterCpBaseLevelBonus:           number;
    raidEncounterGuaranteedIndividualValues: number;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toGameMasterEntry(json: string): GameMaster {
        return cast(JSON.parse(json), a(r("GameMasterEntry")));
    }

    public static gameMasterEntryToJson(value: GameMaster): string {
        return JSON.stringify(uncast(value, a(r("GameMasterEntry"))), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "GameMasterEntry": o([
        { json: "templateId", js: "templateId", typ: "" },
        { json: "data", js: "data", typ: r("Data") },
    ], false),
    "Data": o([
        { json: "templateId", js: "templateId", typ: "" },
        { json: "addressablePokemonSettings", js: "addressablePokemonSettings", typ: u(undefined, r("AddressablePokemonSettings")) },
        { json: "addressBookImportSettings", js: "addressBookImportSettings", typ: u(undefined, r("AddressBookImportSettings")) },
        { json: "obAdvancedSettings", js: "obAdvancedSettings", typ: u(undefined, r("ObAdvancedSettings")) },
        { json: "arTelemetrySettings", js: "arTelemetrySettings", typ: u(undefined, r("ArTelemetrySettings")) },
        { json: "obAssetRefreshSettings", js: "obAssetRefreshSettings", typ: u(undefined, r("ObAssetRefreshSettings")) },
        { json: "avatarGroupOrderSettings", js: "avatarGroupOrderSettings", typ: u(undefined, r("AvatarGroupOrderSettings")) },
        { json: "avatarCustomization", js: "avatarCustomization", typ: u(undefined, r("AvatarCustomization")) },
        { json: "levelUpRewardSettings", js: "levelUpRewardSettings", typ: u(undefined, r("LevelUpRewardSettings")) },
        { json: "backgroundModeSettings", js: "backgroundModeSettings", typ: u(undefined, r("BackgroundModeSettings")) },
        { json: "badgeSettings", js: "badgeSettings", typ: u(undefined, r("BadgeSettings")) },
        { json: "battleHubBadgeSettings", js: "battleHubBadgeSettings", typ: u(undefined, r("BattleHubBadgeSettings")) },
        { json: "battleHubOrderSettings", js: "battleHubOrderSettings", typ: u(undefined, r("BattleHubOrderSettings")) },
        { json: "battlePartySettings", js: "battlePartySettings", typ: u(undefined, r("BattlePartySettings")) },
        { json: "battleSettings", js: "battleSettings", typ: u(undefined, m(3.14)) },
        { json: "obBattleVisualSettings", js: "obBattleVisualSettings", typ: u(undefined, r("ObBattleVisualSettings")) },
        { json: "belugaPokemonWhitelist", js: "belugaPokemonWhitelist", typ: u(undefined, r("BelugaPokemonWhitelist")) },
        { json: "obGameMasterSettings13", js: "obGameMasterSettings13", typ: u(undefined, r("ExternalAddressableAssetsSettings")) },
        { json: "buddyActivitySettings", js: "buddyActivitySettings", typ: u(undefined, r("BuddyActivitySettings")) },
        { json: "buddyActivityCategorySettings", js: "buddyActivityCategorySettings", typ: u(undefined, r("BuddyActivityCategorySettings")) },
        { json: "buddyEmotionLevelSettings", js: "buddyEmotionLevelSettings", typ: u(undefined, r("BuddyEmotionLevelSettings")) },
        { json: "buddyEncounterCameoSettings", js: "buddyEncounterCameoSettings", typ: u(undefined, r("BuddyEncounterCameoSettings")) },
        { json: "buddyHungerSettings", js: "buddyHungerSettings", typ: u(undefined, r("BuddyHungerSettings")) },
        { json: "buddyInteractionSettings", js: "buddyInteractionSettings", typ: u(undefined, r("BuddyInteractionSettings")) },
        { json: "buddyLevelSettings", js: "buddyLevelSettings", typ: u(undefined, r("BuddyLevelSettings")) },
        { json: "buddySwapSettings", js: "buddySwapSettings", typ: u(undefined, r("BuddySwapSettings")) },
        { json: "buddyWalkSettings", js: "buddyWalkSettings", typ: u(undefined, r("BuddyWalkSettings")) },
        { json: "butterflyCollectorSettings", js: "butterflyCollectorSettings", typ: u(undefined, r("ButterflyCollectorSettings")) },
        { json: "obCampfireSettings", js: "obCampfireSettings", typ: u(undefined, r("ObCampfireSettings")) },
        { json: "obCatchRadiusMultiplierSettings", js: "obCatchRadiusMultiplierSettings", typ: u(undefined, r("ObCatchRadiusMultiplierSettings")) },
        { json: "evolutionQuestTemplate", js: "evolutionQuestTemplate", typ: u(undefined, r("EvolutionQuestTemplate")) },
        { json: "invasionNpcDisplaySettings", js: "invasionNpcDisplaySettings", typ: u(undefined, r("InvasionNpcDisplaySettings")) },
        { json: "combatCompetitiveSeasonSettings", js: "combatCompetitiveSeasonSettings", typ: u(undefined, r("CombatCompetitiveSeasonSettings")) },
        { json: "combatLeague", js: "combatLeague", typ: u(undefined, r("CombatLeague")) },
        { json: "combatLeagueSettings", js: "combatLeagueSettings", typ: u(undefined, r("CombatLeagueSettings")) },
        { json: "combatType", js: "combatType", typ: u(undefined, r("CombatType")) },
        { json: "combatRankingProtoSettings", js: "combatRankingProtoSettings", typ: u(undefined, r("CombatRankingProtoSettings")) },
        { json: "combatSettings", js: "combatSettings", typ: u(undefined, r("CombatSettings")) },
        { json: "combatStatStageSettings", js: "combatStatStageSettings", typ: u(undefined, r("CombatStatStageSettings")) },
        { json: "combatMove", js: "combatMove", typ: u(undefined, r("CombatMove")) },
        { json: "obContestSettings", js: "obContestSettings", typ: u(undefined, r("ObContestSettings")) },
        { json: "obConversationSettings", js: "obConversationSettings", typ: u(undefined, r("ExternalAddressableAssetsSettings")) },
        { json: "crossGameSocialSettings", js: "crossGameSocialSettings", typ: u(undefined, r("CrossGameSocialSettings")) },
        { json: "obDailyAdventureIncenseSettings", js: "obDailyAdventureIncenseSettings", typ: u(undefined, r("ObDailyAdventureIncenseSettings")) },
        { json: "deepLinkingSettings", js: "deepLinkingSettings", typ: u(undefined, r("DeepLinkingSettings")) },
        { json: "obEggHatchImprovementSettings", js: "obEggHatchImprovementSettings", typ: u(undefined, r("ObEggHatchImprovementSettings")) },
        { json: "eggTransparencySettings", js: "eggTransparencySettings", typ: u(undefined, r("EggTransparencySettings")) },
        { json: "friendProfileSettings", js: "friendProfileSettings", typ: u(undefined, r("FriendProfileSettings")) },
        { json: "encounterSettings", js: "encounterSettings", typ: u(undefined, r("EncounterSettings")) },
        { json: "pokemonHomeEnergyCosts", js: "pokemonHomeEnergyCosts", typ: u(undefined, r("PokemonHomeEnergyCosts")) },
        { json: "obEvolutionChainDisplaySettings", js: "obEvolutionChainDisplaySettings", typ: u(undefined, r("ObEvolutionChainDisplaySettings")) },
        { json: "obEvolvePreviewSettings", js: "obEvolvePreviewSettings", typ: u(undefined, r("ObEvolvePreviewSettings")) },
        { json: "obGameMasterSettings16", js: "obGameMasterSettings16", typ: u(undefined, r("ObGameMasterSettings16")) },
        { json: "pokemonExtendedSettings", js: "pokemonExtendedSettings", typ: u(undefined, r("PokemonExtendedSettings")) },
        { json: "externalAddressableAssetsSettings", js: "externalAddressableAssetsSettings", typ: u(undefined, r("ExternalAddressableAssetsSettings")) },
        { json: "exRaidSettings", js: "exRaidSettings", typ: u(undefined, r("ExRAIDSettings")) },
        { json: "obFeatureUnlockSettings", js: "obFeatureUnlockSettings", typ: u(undefined, r("ObFeatureUnlockSettings")) },
        { json: "obFormsRefactorSettings", js: "obFormsRefactorSettings", typ: u(undefined, r("ObFormsRefactorSettings")) },
        { json: "formSettings", js: "formSettings", typ: u(undefined, r("FormSettings")) },
        { json: "obFortPowerUpSettings", js: "obFortPowerUpSettings", typ: u(undefined, r("ObFortPowerUpSettings")) },
        { json: "friendshipMilestoneSettings", js: "friendshipMilestoneSettings", typ: u(undefined, r("FriendshipMilestoneSettings")) },
        { json: "geotargetedQuestSettings", js: "geotargetedQuestSettings", typ: u(undefined, r("GeotargetedQuestSettings")) },
        { json: "obGiftingSettings", js: "obGiftingSettings", typ: u(undefined, r("ObGiftingSettings")) },
        { json: "guiSearchSettings", js: "guiSearchSettings", typ: u(undefined, r("GUISearchSettings")) },
        { json: "gymBadgeSettings", js: "gymBadgeSettings", typ: u(undefined, r("GymBadgeSettings")) },
        { json: "gymLevel", js: "gymLevel", typ: u(undefined, r("GymLevel")) },
        { json: "obGameMasterLanguageSettings", js: "obGameMasterLanguageSettings", typ: u(undefined, r("ObGameMasterLanguageSettings")) },
        { json: "iapCategoryDisplay", js: "iapCategoryDisplay", typ: u(undefined, r("IapCategoryDisplay")) },
        { json: "iapSettings", js: "iapSettings", typ: u(undefined, r("IapSettings")) },
        { json: "incidentPrioritySettings", js: "incidentPrioritySettings", typ: u(undefined, r("IncidentPrioritySettings")) },
        { json: "obInvasionCharacterSettings", js: "obInvasionCharacterSettings", typ: u(undefined, r("ObInvasionCharacterSettings")) },
        { json: "obIncubatorFlowSettings", js: "obIncubatorFlowSettings", typ: u(undefined, r("ObIncubatorFlowSettings")) },
        { json: "pokestopInvasionAvailabilitySettings", js: "pokestopInvasionAvailabilitySettings", typ: u(undefined, r("PokestopInvasionAvailabilitySettings")) },
        { json: "inventorySettings", js: "inventorySettings", typ: u(undefined, r("InventorySettings")) },
        { json: "itemSettings", js: "itemSettings", typ: u(undefined, r("ItemSettings")) },
        { json: "itemInventoryUpdateSettings", js: "itemInventoryUpdateSettings", typ: u(undefined, r("ItemInventoryUpdateSettings")) },
        { json: "obLanguageSelectorSettings", js: "obLanguageSelectorSettings", typ: u(undefined, r("ObLanguageSelectorSettings")) },
        { json: "obLocationCardSettings", js: "obLocationCardSettings", typ: u(undefined, r("ObLocationCardSettings")) },
        { json: "loadingScreenSettings", js: "loadingScreenSettings", typ: u(undefined, r("LoadingScreenSettings")) },
        { json: "obLocationCardFeatureSettings", js: "obLocationCardFeatureSettings", typ: u(undefined, r("ObSettings")) },
        { json: "limitedPurchaseSkuSettings", js: "limitedPurchaseSkuSettings", typ: u(undefined, r("LimitedPurchaseSkuSettings")) },
        { json: "luckyPokemonSettings", js: "luckyPokemonSettings", typ: u(undefined, r("LuckyPokemonSettings")) },
        { json: "mapDisplaySettings", js: "mapDisplaySettings", typ: u(undefined, r("MapDisplaySettings")) },
        { json: "obInteractionRangeSettings", js: "obInteractionRangeSettings", typ: u(undefined, r("ObInteractionRangeSettings")) },
        { json: "obMegaLevelSettings", js: "obMegaLevelSettings", typ: u(undefined, r("ObMegaLevelSettings")) },
        { json: "megaEvoSettings", js: "megaEvoSettings", typ: u(undefined, r("MegaEvoSettings")) },
        { json: "monodepthSettings", js: "monodepthSettings", typ: u(undefined, r("MonodepthSettings")) },
        { json: "obGameMasterSettings15", js: "obGameMasterSettings15", typ: u(undefined, r("ObGameMasterSettings15")) },
        { json: "newsFeedClientSettings", js: "newsFeedClientSettings", typ: u(undefined, r("NewsFeedClientSettings")) },
        { json: "onboardingSettings", js: "onboardingSettings", typ: u(undefined, r("OnboardingSettings")) },
        { json: "onboardingV2Settings", js: "onboardingV2Settings", typ: u(undefined, r("OnboardingV2Settings")) },
        { json: "partyRecommendationSettings", js: "partyRecommendationSettings", typ: u(undefined, r("PartyRecommendationSettings")) },
        { json: "obPhotoSettings", js: "obPhotoSettings", typ: u(undefined, r("ObPhotoSettings")) },
        { json: "platypusRolloutSettings", js: "platypusRolloutSettings", typ: u(undefined, r("PlatypusRolloutSettings")) },
        { json: "playerLevel", js: "playerLevel", typ: u(undefined, r("PlayerLevel")) },
        { json: "pokecoinPurchaseDisplayGmt", js: "pokecoinPurchaseDisplayGmt", typ: u(undefined, r("Gmt")) },
        { json: "obPokedexCategoriesSettings", js: "obPokedexCategoriesSettings", typ: u(undefined, r("ObPokedexCategoriesSettings")) },
        { json: "pokedexSizeStatsSettings", js: "pokedexSizeStatsSettings", typ: u(undefined, r("PokedexSizeStatsSettings")) },
        { json: "obPokemonFxSettings", js: "obPokemonFxSettings", typ: u(undefined, r("ObPokemonFxSettings")) },
        { json: "pokemonHomeSettings", js: "pokemonHomeSettings", typ: u(undefined, r("PokemonHomeSettings")) },
        { json: "pokemonScaleSettings", js: "pokemonScaleSettings", typ: u(undefined, r("PokemonScaleSettings")) },
        { json: "pokemonTagSettings", js: "pokemonTagSettings", typ: u(undefined, r("PokemonTagSettings")) },
        { json: "typeEffective", js: "typeEffective", typ: u(undefined, r("TypeEffective")) },
        { json: "pokemonUpgrades", js: "pokemonUpgrades", typ: u(undefined, r("PokemonUpgrades")) },
        { json: "obPopupControlSettings", js: "obPopupControlSettings", typ: u(undefined, r("ObPopupControlSettings")) },
        { json: "obPostCardCollectionSettings", js: "obPostCardCollectionSettings", typ: u(undefined, r("ObSettings")) },
        { json: "obPowerUpPoiSettings", js: "obPowerUpPoiSettings", typ: u(undefined, r("ObPowerUpPoiSettings")) },
        { json: "obPrimalEvoSettings", js: "obPrimalEvoSettings", typ: u(undefined, r("ObPrimalEvoSettings")) },
        { json: "obPushGatewaySettings", js: "obPushGatewaySettings", typ: u(undefined, r("ObPushGatewaySettings")) },
        { json: "obVpsEventSettings", js: "obVpsEventSettings", typ: u(undefined, r("ObVpsEventSettings")) },
        { json: "questEvolutionSettings", js: "questEvolutionSettings", typ: u(undefined, r("QuestEvolutionSettings")) },
        { json: "questSettings", js: "questSettings", typ: u(undefined, r("QuestSettings")) },
        { json: "raidSettings", js: "raidSettings", typ: u(undefined, r("RAIDSettings")) },
        { json: "obRaidLobbyCounterSettings", js: "obRaidLobbyCounterSettings", typ: u(undefined, r("ObRAIDLobbyCounterSettings")) },
        { json: "recomendedSearchSettings", js: "recomendedSearchSettings", typ: u(undefined, r("RecomendedSearchSettings")) },
        { json: "referralSettings", js: "referralSettings", typ: u(undefined, r("ReferralSettings")) },
        { json: "obRemoteRaidLimitSettings", js: "obRemoteRaidLimitSettings", typ: u(undefined, r("ObRemoteRAIDLimitSettings")) },
        { json: "routeCreationSettings", js: "routeCreationSettings", typ: u(undefined, r("RouteCreationSettings")) },
        { json: "routeDiscoverySettings", js: "routeDiscoverySettings", typ: u(undefined, r("RouteDiscoverySettings")) },
        { json: "routePlaySettings", js: "routePlaySettings", typ: u(undefined, r("RoutePlaySettings")) },
        { json: "obRouteStampCategorySettings", js: "obRouteStampCategorySettings", typ: u(undefined, r("ObRouteStampCategorySettings")) },
        { json: "obSharedMoveSettings", js: "obSharedMoveSettings", typ: u(undefined, r("ObSharedMoveSettings")) },
        { json: "smeargleMovesSettings", js: "smeargleMovesSettings", typ: u(undefined, r("SmeargleMovesSettings")) },
        { json: "genderSettings", js: "genderSettings", typ: u(undefined, r("GenderSettings")) },
        { json: "sponsoredGeofenceGiftSettings", js: "sponsoredGeofenceGiftSettings", typ: u(undefined, r("SponsoredGeofenceGiftSettings")) },
        { json: "stickerMetadata", js: "stickerMetadata", typ: u(undefined, r("StickerMetadata")) },
        { json: "iapItemDisplay", js: "iapItemDisplay", typ: u(undefined, r("IapItemDisplay")) },
        { json: "obStyleShopSettings", js: "obStyleShopSettings", typ: u(undefined, r("ObStyleShopSettings")) },
        { json: "obInAppSurveySettings", js: "obInAppSurveySettings", typ: u(undefined, r("ObInAppSurveySettings")) },
        { json: "tappableSettings", js: "tappableSettings", typ: u(undefined, r("TappableSettings")) },
        { json: "temporaryEvolutionSettings", js: "temporaryEvolutionSettings", typ: u(undefined, r("TemporaryEvolutionSettings")) },
        { json: "obTicketGiftingSettings", js: "obTicketGiftingSettings", typ: u(undefined, r("ObTicketGiftingSettings")) },
        { json: "combatNpcTrainer", js: "combatNpcTrainer", typ: u(undefined, r("CombatNpcTrainer")) },
        { json: "combatNpcPersonality", js: "combatNpcPersonality", typ: u(undefined, r("CombatNpcPersonality")) },
        { json: "pokemonFamily", js: "pokemonFamily", typ: u(undefined, r("PokemonFamily")) },
        { json: "pokemonSettings", js: "pokemonSettings", typ: u(undefined, r("PokemonSettings")) },
        { json: "moveSettings", js: "moveSettings", typ: u(undefined, r("MoveSettings")) },
        { json: "pokemonHomeFormReversions", js: "pokemonHomeFormReversions", typ: u(undefined, r("PokemonHomeFormReversions")) },
        { json: "obVerboseCombatSetting", js: "obVerboseCombatSetting", typ: u(undefined, r("ObVerboseCombatSetting")) },
        { json: "obVerboseRaidSettings", js: "obVerboseRaidSettings", typ: u(undefined, m(true)) },
        { json: "vsSeekerClientSettings", js: "vsSeekerClientSettings", typ: u(undefined, r("VsSeekerClientSettings")) },
        { json: "vsSeekerLoot", js: "vsSeekerLoot", typ: u(undefined, r("VsSeekerLoot")) },
        { json: "vsSeekerPokemonRewards", js: "vsSeekerPokemonRewards", typ: u(undefined, r("VsSeekerPokemonRewards")) },
        { json: "obVsSeekerScheduleSettings", js: "obVsSeekerScheduleSettings", typ: u(undefined, r("ObVsSeekerScheduleSettings")) },
        { json: "weatherAffinities", js: "weatherAffinities", typ: u(undefined, r("WeatherAffinities")) },
        { json: "weatherBonusSettings", js: "weatherBonusSettings", typ: u(undefined, r("WeatherBonusSettings")) },
        { json: "adventureSyncV2Gmt", js: "adventureSyncV2Gmt", typ: u(undefined, r("Gmt")) },
        { json: "camera", js: "camera", typ: u(undefined, r("DataCamera")) },
        { json: "obImpressionTrackingSettings", js: "obImpressionTrackingSettings", typ: u(undefined, r("ObImpressionTrackingSettings")) },
        { json: "moveSequenceSettings", js: "moveSequenceSettings", typ: u(undefined, r("MoveSequenceSettings")) },
        { json: "obStickerCategorySettings", js: "obStickerCategorySettings", typ: u(undefined, r("ObStickerCategorySettings")) },
        { json: "obTutorialSettings", js: "obTutorialSettings", typ: u(undefined, r("ObTutorialSettings")) },
        { json: "obUsernameSuggestionSettings", js: "obUsernameSuggestionSettings", typ: u(undefined, r("ObUsernameSuggestionSettings")) },
    ], false),
    "AddressBookImportSettings": o([
        { json: "isEnabled", js: "isEnabled", typ: true },
        { json: "onboardingScreenLevel", js: "onboardingScreenLevel", typ: 0 },
        { json: "showOptOutCheckbox", js: "showOptOutCheckbox", typ: true },
        { json: "repromptOnboardingForV1", js: "repromptOnboardingForV1", typ: true },
    ], false),
    "AddressablePokemonSettings": o([
        { json: "obAddressablePokemonId", js: "obAddressablePokemonId", typ: a("") },
    ], false),
    "Gmt": o([
        { json: "featureEnabled", js: "featureEnabled", typ: true },
    ], false),
    "ArTelemetrySettings": o([
        { json: "measureBattery", js: "measureBattery", typ: true },
        { json: "batterySamplingIntervalMs", js: "batterySamplingIntervalMs", typ: 0 },
        { json: "measureFramerate", js: "measureFramerate", typ: true },
        { json: "framerateSamplingIntervalMs", js: "framerateSamplingIntervalMs", typ: 0 },
        { json: "percentageSessionsToSample", js: "percentageSessionsToSample", typ: 3.14 },
    ], false),
    "AvatarCustomization": o([
        { json: "enabled", js: "enabled", typ: u(undefined, true) },
        { json: "avatarType", js: "avatarType", typ: u(undefined, r("AvatarType")) },
        { json: "slot", js: "slot", typ: a(r("Slot")) },
        { json: "bundleName", js: "bundleName", typ: u(undefined, "") },
        { json: "assetName", js: "assetName", typ: "" },
        { json: "groupName", js: "groupName", typ: r("Name") },
        { json: "sortOrder", js: "sortOrder", typ: 0 },
        { json: "unlockType", js: "unlockType", typ: r("UnlockType") },
        { json: "iapSku", js: "iapSku", typ: u(undefined, "") },
        { json: "iconName", js: "iconName", typ: u(undefined, "") },
        { json: "obStyleShopV2SetNames", js: "obStyleShopV2SetNames", typ: u(undefined, a("")) },
        { json: "unlockBadgeType", js: "unlockBadgeType", typ: u(undefined, "") },
        { json: "unlockBadgeLevel", js: "unlockBadgeLevel", typ: u(undefined, 0) },
        { json: "unlockPlayerLevel", js: "unlockPlayerLevel", typ: u(undefined, 0) },
        { json: "setPrimeItem", js: "setPrimeItem", typ: u(undefined, true) },
    ], false),
    "AvatarGroupOrderSettings": o([
        { json: "group", js: "group", typ: a(r("Group")) },
    ], false),
    "Group": o([
        { json: "name", js: "name", typ: r("Name") },
        { json: "order", js: "order", typ: 0 },
        { json: "obShowNewTag", js: "obShowNewTag", typ: u(undefined, true) },
    ], false),
    "BackgroundModeSettings": o([
        { json: "weeklyFitnessGoalLevel1DistanceKm", js: "weeklyFitnessGoalLevel1DistanceKm", typ: 3.14 },
        { json: "weeklyFitnessGoalLevel2DistanceKm", js: "weeklyFitnessGoalLevel2DistanceKm", typ: 3.14 },
        { json: "weeklyFitnessGoalLevel3DistanceKm", js: "weeklyFitnessGoalLevel3DistanceKm", typ: 3.14 },
        { json: "weeklyFitnessGoalLevel4DistanceKm", js: "weeklyFitnessGoalLevel4DistanceKm", typ: 3.14 },
        { json: "obWeeklyFitnessGoalLevel5DistanceKm", js: "obWeeklyFitnessGoalLevel5DistanceKm", typ: 3.14 },
    ], false),
    "BadgeSettings": o([
        { json: "badgeType", js: "badgeType", typ: u(0, "") },
        { json: "badgeRank", js: "badgeRank", typ: 0 },
        { json: "targets", js: "targets", typ: a(0) },
        { json: "eventBadge", js: "eventBadge", typ: u(undefined, true) },
    ], false),
    "BattleHubBadgeSettings": o([
        { json: "combatHubDisplayedBadges", js: "combatHubDisplayedBadges", typ: a("") },
    ], false),
    "BattleHubOrderSettings": o([
        { json: "section", js: "section", typ: a(r("Section")) },
        { json: "sectionGroup", js: "sectionGroup", typ: a(r("SectionGroup")) },
    ], false),
    "Section": o([
        { json: "mainSection", js: "mainSection", typ: "" },
        { json: "subsection", js: "subsection", typ: a("") },
    ], false),
    "SectionGroup": o([
        { json: "section", js: "section", typ: a("") },
    ], false),
    "BattlePartySettings": o([
        { json: "enableBattlePartySaving", js: "enableBattlePartySaving", typ: true },
        { json: "maxBattleParties", js: "maxBattleParties", typ: 0 },
        { json: "overallPartiesCap", js: "overallPartiesCap", typ: 0 },
    ], false),
    "BelugaPokemonWhitelist": o([
        { json: "maxAllowedPokemonPokedexNumber", js: "maxAllowedPokemonPokedexNumber", typ: 0 },
        { json: "additionalPokemonAllowed", js: "additionalPokemonAllowed", typ: a("") },
        { json: "costumesAllowed", js: "costumesAllowed", typ: a("") },
    ], false),
    "BuddyActivityCategorySettings": o([
        { json: "activityCategory", js: "activityCategory", typ: u(0, "") },
        { json: "maxPointsPerDay", js: "maxPointsPerDay", typ: 0 },
    ], false),
    "BuddyActivitySettings": o([
        { json: "activity", js: "activity", typ: "" },
        { json: "activityCategory", js: "activityCategory", typ: u(0, "") },
        { json: "maxTimesPerDay", js: "maxTimesPerDay", typ: 0 },
        { json: "numPointsPerAction", js: "numPointsPerAction", typ: 0 },
        { json: "numEmotionPointsPerAction", js: "numEmotionPointsPerAction", typ: 0 },
        { json: "emotionCooldownDurationMs", js: "emotionCooldownDurationMs", typ: u(undefined, 0) },
    ], false),
    "BuddyEmotionLevelSettings": o([
        { json: "emotionLevel", js: "emotionLevel", typ: "" },
        { json: "emotionAnimation", js: "emotionAnimation", typ: "" },
        { json: "minEmotionPointsRequired", js: "minEmotionPointsRequired", typ: u(undefined, 0) },
    ], false),
    "BuddyEncounterCameoSettings": o([
        { json: "buddyWildEncounterCameoChancePercent", js: "buddyWildEncounterCameoChancePercent", typ: 3.14 },
        { json: "buddyQuestEncounterCameoChancePercent", js: "buddyQuestEncounterCameoChancePercent", typ: 3.14 },
        { json: "buddyRaidEncounterCameoChancePercent", js: "buddyRaidEncounterCameoChancePercent", typ: 3.14 },
        { json: "buddyInvasionEncounterCameoChancePercent", js: "buddyInvasionEncounterCameoChancePercent", typ: 3.14 },
    ], false),
    "BuddyHungerSettings": o([
        { json: "numHungerPointsRequiredForFull", js: "numHungerPointsRequiredForFull", typ: 0 },
        { json: "decayPointsPerBucket", js: "decayPointsPerBucket", typ: 0 },
        { json: "millisecondsPerBucket", js: "millisecondsPerBucket", typ: "" },
        { json: "cooldownDurationMs", js: "cooldownDurationMs", typ: "" },
        { json: "decayDurationAfterFullMs", js: "decayDurationAfterFullMs", typ: "" },
    ], false),
    "BuddyInteractionSettings": o([
        { json: "feedItemWhitelist", js: "feedItemWhitelist", typ: a("") },
    ], false),
    "BuddyLevelSettings": o([
        { json: "level", js: "level", typ: "" },
        { json: "minNonCumulativePointsRequired", js: "minNonCumulativePointsRequired", typ: u(undefined, 0) },
        { json: "unlockedTraits", js: "unlockedTraits", typ: u(undefined, a("")) },
    ], false),
    "BuddySwapSettings": o([
        { json: "maxSwapsPerDay", js: "maxSwapsPerDay", typ: 0 },
        { json: "obBuddySwapSettingsBool1", js: "obBuddySwapSettingsBool1", typ: true },
    ], false),
    "BuddyWalkSettings": o([
        { json: "kmRequiredPerAffectionPoint", js: "kmRequiredPerAffectionPoint", typ: 3.14 },
    ], false),
    "ButterflyCollectorSettings": o([
        { json: "enabled", js: "enabled", typ: true },
        { json: "version", js: "version", typ: 0 },
        { json: "region", js: "region", typ: a("") },
        { json: "dailyProgressFromInventory", js: "dailyProgressFromInventory", typ: 0 },
    ], false),
    "DataCamera": o([
        { json: "interpolation", js: "interpolation", typ: a(r("Interpolation")) },
        { json: "targetType", js: "targetType", typ: a(r("TargetType")) },
        { json: "easeInSpeed", js: "easeInSpeed", typ: a(3.14) },
        { json: "easeOutSpeed", js: "easeOutSpeed", typ: a(3.14) },
        { json: "durationSeconds", js: "durationSeconds", typ: a(3.14) },
        { json: "waitSeconds", js: "waitSeconds", typ: a(3.14) },
        { json: "transitionSeconds", js: "transitionSeconds", typ: a(3.14) },
        { json: "angleDegree", js: "angleDegree", typ: a(3.14) },
        { json: "angleOffsetDegree", js: "angleOffsetDegree", typ: a(3.14) },
        { json: "pitchDegree", js: "pitchDegree", typ: a(3.14) },
        { json: "pitchOffsetDegree", js: "pitchOffsetDegree", typ: a(3.14) },
        { json: "rollDegree", js: "rollDegree", typ: a(3.14) },
        { json: "distanceMeters", js: "distanceMeters", typ: a(3.14) },
        { json: "heightPercent", js: "heightPercent", typ: a(3.14) },
        { json: "vertCtrRatio", js: "vertCtrRatio", typ: a(3.14) },
        { json: "nextCamera", js: "nextCamera", typ: u(undefined, "") },
    ], false),
    "CombatCompetitiveSeasonSettings": o([
        { json: "seasonEndTimeTimestamp", js: "seasonEndTimeTimestamp", typ: a("") },
        { json: "ratingAdjustmentPercentage", js: "ratingAdjustmentPercentage", typ: 3.14 },
        { json: "rankingAdjustmentPercentage", js: "rankingAdjustmentPercentage", typ: 3.14 },
    ], false),
    "CombatLeague": o([
        { json: "title", js: "title", typ: "" },
        { json: "enabled", js: "enabled", typ: true },
        { json: "pokemonCondition", js: "pokemonCondition", typ: a(r("PokemonCondition")) },
        { json: "iconUrl", js: "iconUrl", typ: "" },
        { json: "pokemonCount", js: "pokemonCount", typ: 0 },
        { json: "bannedPokemon", js: "bannedPokemon", typ: u(undefined, a("")) },
        { json: "badgeType", js: "badgeType", typ: r("BadgeType") },
        { json: "leagueType", js: "leagueType", typ: r("LeagueType") },
        { json: "allowTempEvos", js: "allowTempEvos", typ: u(undefined, true) },
        { json: "obCombatRefactorToggle", js: "obCombatRefactorToggle", typ: u(undefined, a(r("ObCombatRefactorToggle"))) },
        { json: "unlockCondition", js: "unlockCondition", typ: u(undefined, a(r("UnlockCondition"))) },
        { json: "battlePartyCombatLeagueTemplateId", js: "battlePartyCombatLeagueTemplateId", typ: u(undefined, r("CombatLeagueTemplateID")) },
    ], false),
    "PokemonCondition": o([
        { json: "type", js: "type", typ: r("PokemonConditionType") },
        { json: "withPokemonCpLimit", js: "withPokemonCpLimit", typ: u(undefined, r("PokemonConditionWithPokemonCpLimit")) },
        { json: "pokemonCaughtTimestamp", js: "pokemonCaughtTimestamp", typ: u(undefined, r("PokemonCaughtTimestamp")) },
        { json: "pokemonWhiteList", js: "pokemonWhiteList", typ: u(undefined, r("PokemonWhiteList")) },
        { json: "withPokemonType", js: "withPokemonType", typ: u(undefined, r("WithPokemonType")) },
        { json: "pokemonBanList", js: "pokemonBanList", typ: u(undefined, r("PokemonBanList")) },
        { json: "pokemonLevelRange", js: "pokemonLevelRange", typ: u(undefined, r("PokemonLevelRange")) },
    ], false),
    "PokemonBanList": o([
        { json: "pokemon", js: "pokemon", typ: a(r("PokemonBanListPokemon")) },
    ], false),
    "PokemonBanListPokemon": o([
        { json: "id", js: "id", typ: "" },
        { json: "forms", js: "forms", typ: u(undefined, a("")) },
    ], false),
    "PokemonCaughtTimestamp": o([
        { json: "afterTimestamp", js: "afterTimestamp", typ: "" },
        { json: "beforeTimestamp", js: "beforeTimestamp", typ: "" },
    ], false),
    "PokemonLevelRange": o([
        { json: "maxLevel", js: "maxLevel", typ: 0 },
    ], false),
    "PokemonWhiteList": o([
        { json: "pokemon", js: "pokemon", typ: a(r("PokemonWhiteListPokemon")) },
    ], false),
    "PokemonWhiteListPokemon": o([
        { json: "id", js: "id", typ: "" },
        { json: "form", js: "form", typ: u(undefined, "") },
        { json: "forms", js: "forms", typ: u(undefined, a("")) },
    ], false),
    "PokemonConditionWithPokemonCpLimit": o([
        { json: "maxCp", js: "maxCp", typ: 0 },
    ], false),
    "WithPokemonType": o([
        { json: "pokemonType", js: "pokemonType", typ: a(r("TypeElement")) },
    ], false),
    "UnlockCondition": o([
        { json: "type", js: "type", typ: r("PokemonConditionType") },
        { json: "minPokemonCount", js: "minPokemonCount", typ: 0 },
        { json: "withPokemonCpLimit", js: "withPokemonCpLimit", typ: u(undefined, r("UnlockConditionWithPokemonCpLimit")) },
    ], false),
    "UnlockConditionWithPokemonCpLimit": o([
        { json: "minCp", js: "minCp", typ: 0 },
        { json: "maxCp", js: "maxCp", typ: 0 },
    ], false),
    "CombatLeagueSettings": o([
        { json: "combatLeagueTemplateId", js: "combatLeagueTemplateId", typ: a(r("CombatLeagueTemplateID")) },
    ], false),
    "CombatMove": o([
        { json: "uniqueId", js: "uniqueId", typ: u(0, "") },
        { json: "type", js: "type", typ: r("TypeElement") },
        { json: "power", js: "power", typ: u(undefined, 3.14) },
        { json: "vfxName", js: "vfxName", typ: "" },
        { json: "energyDelta", js: "energyDelta", typ: u(undefined, 0) },
        { json: "buffs", js: "buffs", typ: u(undefined, r("Buffs")) },
        { json: "durationTurns", js: "durationTurns", typ: u(undefined, 0) },
    ], false),
    "Buffs": o([
        { json: "targetDefenseStatStageChange", js: "targetDefenseStatStageChange", typ: u(undefined, 0) },
        { json: "buffActivationChance", js: "buffActivationChance", typ: 3.14 },
        { json: "attackerAttackStatStageChange", js: "attackerAttackStatStageChange", typ: u(undefined, 0) },
        { json: "targetAttackStatStageChange", js: "targetAttackStatStageChange", typ: u(undefined, 0) },
        { json: "attackerDefenseStatStageChange", js: "attackerDefenseStatStageChange", typ: u(undefined, 0) },
    ], false),
    "CombatNpcPersonality": o([
        { json: "personalityName", js: "personalityName", typ: "" },
        { json: "superEffectiveChance", js: "superEffectiveChance", typ: 3.14 },
        { json: "specialChance", js: "specialChance", typ: 3.14 },
        { json: "offensiveMinimumScore", js: "offensiveMinimumScore", typ: 3.14 },
        { json: "offensiveMaximumScore", js: "offensiveMaximumScore", typ: 3.14 },
        { json: "defensiveMinimumScore", js: "defensiveMinimumScore", typ: u(undefined, 3.14) },
        { json: "defensiveMaximumScore", js: "defensiveMaximumScore", typ: u(undefined, 3.14) },
    ], false),
    "CombatNpcTrainer": o([
        { json: "trainerName", js: "trainerName", typ: "" },
        { json: "combatLeagueTemplateId", js: "combatLeagueTemplateId", typ: r("CombatLeagueTemplateID") },
        { json: "combatPersonalityId", js: "combatPersonalityId", typ: "" },
        { json: "avatar", js: "avatar", typ: r("CombatNpcTrainerAvatar") },
        { json: "availablePokemon", js: "availablePokemon", typ: a(r("CombatNpcTrainerAvailablePokemon")) },
        { json: "trainerTitle", js: "trainerTitle", typ: "" },
        { json: "trainerQuote", js: "trainerQuote", typ: "" },
        { json: "iconUrl", js: "iconUrl", typ: "" },
        { json: "backdropImageBundle", js: "backdropImageBundle", typ: r("BackdropImageBundle") },
    ], false),
    "CombatNpcTrainerAvailablePokemon": o([
        { json: "pokemonType", js: "pokemonType", typ: "" },
        { json: "pokemonDisplay", js: "pokemonDisplay", typ: u(undefined, r("PokemonDisplay")) },
    ], false),
    "PokemonDisplay": o([
        { json: "form", js: "form", typ: "" },
    ], false),
    "CombatNpcTrainerAvatar": o([
        { json: "avatar", js: "avatar", typ: 0 },
    ], false),
    "CombatRankingProtoSettings": o([
        { json: "rankLevel", js: "rankLevel", typ: a(r("RankLevel")) },
        { json: "requiredForRewards", js: "requiredForRewards", typ: r("RequiredForRewards") },
        { json: "minRankToDisplayRating", js: "minRankToDisplayRating", typ: 0 },
        { json: "minRatingRequired", js: "minRatingRequired", typ: u(undefined, 0) },
    ], false),
    "RankLevel": o([
        { json: "rankLevel", js: "rankLevel", typ: 0 },
        { json: "additionalTotalBattlesRequired", js: "additionalTotalBattlesRequired", typ: u(undefined, 0) },
        { json: "additionalWinsRequired", js: "additionalWinsRequired", typ: u(undefined, 0) },
        { json: "minRatingRequired", js: "minRatingRequired", typ: u(undefined, 0) },
    ], false),
    "RequiredForRewards": o([
        { json: "rankLevel", js: "rankLevel", typ: 0 },
        { json: "additionalTotalBattlesRequired", js: "additionalTotalBattlesRequired", typ: 0 },
    ], false),
    "CombatSettings": o([
        { json: "roundDurationSeconds", js: "roundDurationSeconds", typ: 3.14 },
        { json: "turnDurationSeconds", js: "turnDurationSeconds", typ: 3.14 },
        { json: "minigameDurationSeconds", js: "minigameDurationSeconds", typ: 3.14 },
        { json: "sameTypeAttackBonusMultiplier", js: "sameTypeAttackBonusMultiplier", typ: 3.14 },
        { json: "fastAttackBonusMultiplier", js: "fastAttackBonusMultiplier", typ: 3.14 },
        { json: "chargeAttackBonusMultiplier", js: "chargeAttackBonusMultiplier", typ: 3.14 },
        { json: "defenseBonusMultiplier", js: "defenseBonusMultiplier", typ: 3.14 },
        { json: "minigameBonusBaseMultiplier", js: "minigameBonusBaseMultiplier", typ: 3.14 },
        { json: "minigameBonusVariableMultiplier", js: "minigameBonusVariableMultiplier", typ: 3.14 },
        { json: "maxEnergy", js: "maxEnergy", typ: 0 },
        { json: "defenderMinigameMultiplier", js: "defenderMinigameMultiplier", typ: 3.14 },
        { json: "changePokemonDurationSeconds", js: "changePokemonDurationSeconds", typ: 3.14 },
        { json: "minigameSubmitScoreDurationSeconds", js: "minigameSubmitScoreDurationSeconds", typ: 3.14 },
        { json: "quickSwapCooldownDurationSeconds", js: "quickSwapCooldownDurationSeconds", typ: 3.14 },
        { json: "chargeScoreBase", js: "chargeScoreBase", typ: 3.14 },
        { json: "chargeScoreNice", js: "chargeScoreNice", typ: 3.14 },
        { json: "chargeScoreGreat", js: "chargeScoreGreat", typ: 3.14 },
        { json: "chargeScoreExcellent", js: "chargeScoreExcellent", typ: 3.14 },
        { json: "superEffectiveFlyoutDurationTurns", js: "superEffectiveFlyoutDurationTurns", typ: 0 },
        { json: "notVeryEffectiveFlyoutDurationTurns", js: "notVeryEffectiveFlyoutDurationTurns", typ: 0 },
        { json: "blockedEffectiveFlyoutDurationTurns", js: "blockedEffectiveFlyoutDurationTurns", typ: 0 },
        { json: "normalEffectiveFlyoutDurationTurns", js: "normalEffectiveFlyoutDurationTurns", typ: 0 },
        { json: "shadowPokemonAttackBonusMultiplier", js: "shadowPokemonAttackBonusMultiplier", typ: 3.14 },
        { json: "shadowPokemonDefenseBonusMultiplier", js: "shadowPokemonDefenseBonusMultiplier", typ: 3.14 },
        { json: "purifiedPokemonAttackMultiplierVsShadow", js: "purifiedPokemonAttackMultiplierVsShadow", typ: 3.14 },
        { json: "obCombatSettingsBool1", js: "obCombatSettingsBool1", typ: true },
        { json: "obCombatSettingsNotPushedBool2", js: "obCombatSettingsNotPushedBool2", typ: true },
        { json: "obCombatSettings1", js: "obCombatSettings1", typ: r("ObCombatSettings1") },
        { json: "obCombatSettings2", js: "obCombatSettings2", typ: r("ObCombatSettings2") },
        { json: "obCombatSettingsNumber1", js: "obCombatSettingsNumber1", typ: 0 },
    ], false),
    "ObCombatSettings1": o([
        { json: "obCombatSettings1Number1", js: "obCombatSettings1Number1", typ: 0 },
        { json: "enabled", js: "enabled", typ: true },
    ], false),
    "ObCombatSettings2": o([
        { json: "obCombatSettings2Bool1", js: "obCombatSettings2Bool1", typ: true },
    ], false),
    "CombatStatStageSettings": o([
        { json: "minimumStatStage", js: "minimumStatStage", typ: 0 },
        { json: "maximumStatStage", js: "maximumStatStage", typ: 0 },
        { json: "attackBuffMultiplier", js: "attackBuffMultiplier", typ: a(3.14) },
        { json: "defenseBuffMultiplier", js: "defenseBuffMultiplier", typ: a(3.14) },
    ], false),
    "CombatType": o([
        { json: "type", js: "type", typ: r("TypeElement") },
        { json: "niceLevelThreshold", js: "niceLevelThreshold", typ: 3.14 },
        { json: "greatLevelThreshold", js: "greatLevelThreshold", typ: 3.14 },
        { json: "excellentLevelThreshold", js: "excellentLevelThreshold", typ: 3.14 },
    ], false),
    "CrossGameSocialSettings": o([
        { json: "onlineStatusEnabledOverrideLevel", js: "onlineStatusEnabledOverrideLevel", typ: true },
        { json: "nianticProfileEnabledOverrideLevel", js: "nianticProfileEnabledOverrideLevel", typ: true },
    ], false),
    "DeepLinkingSettings": o([
        { json: "minPlayerLevelForExternalLink", js: "minPlayerLevelForExternalLink", typ: 0 },
        { json: "minPlayerLevelForNotificationLink", js: "minPlayerLevelForNotificationLink", typ: 0 },
        { json: "obExternalAction", js: "obExternalAction", typ: a("") },
        { json: "obNotificationAction", js: "obNotificationAction", typ: a("") },
        { json: "obDeepLinkingSettingBool1", js: "obDeepLinkingSettingBool1", typ: true },
    ], false),
    "EggTransparencySettings": o([
        { json: "enableEggDistribution", js: "enableEggDistribution", typ: true },
    ], false),
    "EncounterSettings": o([
        { json: "spinBonusThreshold", js: "spinBonusThreshold", typ: 3.14 },
        { json: "excellentThrowThreshold", js: "excellentThrowThreshold", typ: 3.14 },
        { json: "greatThrowThreshold", js: "greatThrowThreshold", typ: 3.14 },
        { json: "niceThrowThreshold", js: "niceThrowThreshold", typ: 3.14 },
        { json: "milestoneThreshold", js: "milestoneThreshold", typ: 0 },
        { json: "arPlusModeEnabled", js: "arPlusModeEnabled", typ: true },
        { json: "arCloseProximityThreshold", js: "arCloseProximityThreshold", typ: 3.14 },
        { json: "arLowAwarenessThreshold", js: "arLowAwarenessThreshold", typ: 3.14 },
    ], false),
    "EvolutionQuestTemplate": o([
        { json: "questTemplateId", js: "questTemplateId", typ: "" },
        { json: "questType", js: "questType", typ: "" },
        { json: "goals", js: "goals", typ: a(r("Goal")) },
        { json: "context", js: "context", typ: r("Context") },
        { json: "display", js: "display", typ: r("Display") },
    ], false),
    "Display": o([
        { json: "description", js: "description", typ: "" },
        { json: "title", js: "title", typ: "" },
    ], false),
    "Goal": o([
        { json: "target", js: "target", typ: 0 },
        { json: "condition", js: "condition", typ: u(undefined, a(r("Condition"))) },
    ], false),
    "Condition": o([
        { json: "type", js: "type", typ: "" },
        { json: "withPokemonType", js: "withPokemonType", typ: u(undefined, r("WithPokemonType")) },
        { json: "withThrowType", js: "withThrowType", typ: u(undefined, r("WithThrowType")) },
    ], false),
    "WithThrowType": o([
        { json: "throwType", js: "throwType", typ: "" },
    ], false),
    "ExRAIDSettings": o([
        { json: "minimumExRaidShareLevel", js: "minimumExRaidShareLevel", typ: "" },
        { json: "undefinedExRaidSetting", js: "undefinedExRaidSetting", typ: 0 },
    ], false),
    "ExternalAddressableAssetsSettings": o([
    ], false),
    "FormSettings": o([
        { json: "pokemon", js: "pokemon", typ: "" },
        { json: "forms", js: "forms", typ: u(undefined, a(r("Form"))) },
    ], false),
    "Form": o([
        { json: "form", js: "form", typ: u(undefined, u(0, "")) },
        { json: "assetBundleSuffix", js: "assetBundleSuffix", typ: u(undefined, "") },
        { json: "isCostume", js: "isCostume", typ: u(undefined, true) },
        { json: "assetBundleValue", js: "assetBundleValue", typ: u(undefined, 0) },
    ], false),
    "FriendProfileSettings": o([
        { json: "enableSwiping", js: "enableSwiping", typ: true },
    ], false),
    "FriendshipMilestoneSettings": o([
        { json: "milestoneXpReward", js: "milestoneXpReward", typ: 0 },
        { json: "attackBonusPercentage", js: "attackBonusPercentage", typ: 3.14 },
        { json: "unlockedTrading", js: "unlockedTrading", typ: a("") },
        { json: "minPointsToReach", js: "minPointsToReach", typ: u(undefined, 0) },
        { json: "raidBallBonus", js: "raidBallBonus", typ: u(undefined, 0) },
        { json: "tradingDiscount", js: "tradingDiscount", typ: u(undefined, 3.14) },
    ], false),
    "GenderSettings": o([
        { json: "pokemon", js: "pokemon", typ: "" },
        { json: "gender", js: "gender", typ: r("GenderClass") },
    ], false),
    "GenderClass": o([
        { json: "malePercent", js: "malePercent", typ: u(undefined, 3.14) },
        { json: "femalePercent", js: "femalePercent", typ: u(undefined, 3.14) },
        { json: "genderlessPercent", js: "genderlessPercent", typ: u(undefined, 3.14) },
    ], false),
    "GeotargetedQuestSettings": o([
        { json: "enableGeotargetedQuests", js: "enableGeotargetedQuests", typ: true },
    ], false),
    "GUISearchSettings": o([
        { json: "guiSearchEnabled", js: "guiSearchEnabled", typ: true },
        { json: "maxNumberRecentSearches", js: "maxNumberRecentSearches", typ: 0 },
        { json: "maxNumberFavoriteSearches", js: "maxNumberFavoriteSearches", typ: 0 },
        { json: "maxQueryLength", js: "maxQueryLength", typ: 0 },
    ], false),
    "GymBadgeSettings": o([
        { json: "target", js: "target", typ: a(0) },
        { json: "battleWinningScorePerDefenderCp", js: "battleWinningScorePerDefenderCp", typ: 3.14 },
        { json: "gymDefendingScorePerMinute", js: "gymDefendingScorePerMinute", typ: 3.14 },
        { json: "berryFeedingScore", js: "berryFeedingScore", typ: 0 },
        { json: "pokemonDeployScore", js: "pokemonDeployScore", typ: 0 },
        { json: "raidBattleWinningScore", js: "raidBattleWinningScore", typ: 0 },
        { json: "loseAllBattlesScore", js: "loseAllBattlesScore", typ: 0 },
    ], false),
    "GymLevel": o([
        { json: "requiredExperience", js: "requiredExperience", typ: a(0) },
        { json: "leaderSlots", js: "leaderSlots", typ: a(0) },
        { json: "trainerSlots", js: "trainerSlots", typ: a(0) },
    ], false),
    "IapCategoryDisplay": o([
        { json: "category", js: "category", typ: "" },
        { json: "sortOrder", js: "sortOrder", typ: u(undefined, 0) },
        { json: "imageUrl", js: "imageUrl", typ: u(undefined, "") },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "bannerEnabled", js: "bannerEnabled", typ: u(undefined, true) },
        { json: "bannerTitle", js: "bannerTitle", typ: u(undefined, "") },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "displayRows", js: "displayRows", typ: u(undefined, 0) },
        { json: "hidden", js: "hidden", typ: u(undefined, true) },
    ], false),
    "IapItemDisplay": o([
        { json: "sku", js: "sku", typ: "" },
        { json: "category", js: "category", typ: r("Category") },
        { json: "sortOrder", js: "sortOrder", typ: u(undefined, 0) },
        { json: "spriteId", js: "spriteId", typ: u(undefined, "") },
        { json: "title", js: "title", typ: u(undefined, "") },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "skuEnableTime", js: "skuEnableTime", typ: u(undefined, Date) },
        { json: "skuDisableTime", js: "skuDisableTime", typ: u(undefined, Date) },
        { json: "skuEnableTimeUtcMs", js: "skuEnableTimeUtcMs", typ: u(undefined, "") },
        { json: "skuDisableTimeUtcMs", js: "skuDisableTimeUtcMs", typ: u(undefined, "") },
        { json: "imageUrl", js: "imageUrl", typ: u(undefined, "") },
        { json: "hidden", js: "hidden", typ: u(undefined, true) },
        { json: "sale", js: "sale", typ: u(undefined, true) },
    ], false),
    "IapSettings": o([
        { json: "dailyDefenderBonusPerPokemon", js: "dailyDefenderBonusPerPokemon", typ: a(0) },
        { json: "dailyDefenderBonusMaxDefenders", js: "dailyDefenderBonusMaxDefenders", typ: 0 },
        { json: "dailyDefenderBonusCurrency", js: "dailyDefenderBonusCurrency", typ: a("") },
        { json: "minTimeBetweenClaimsMs", js: "minTimeBetweenClaimsMs", typ: "" },
    ], false),
    "IncidentPrioritySettings": o([
        { json: "incidentPriority", js: "incidentPriority", typ: a(r("IncidentPriority")) },
    ], false),
    "IncidentPriority": o([
        { json: "priority", js: "priority", typ: 0 },
        { json: "displayType", js: "displayType", typ: "" },
    ], false),
    "InvasionNpcDisplaySettings": o([
        { json: "trainerName", js: "trainerName", typ: "" },
        { json: "avatar", js: "avatar", typ: r("InvasionNpcDisplaySettingsAvatar") },
        { json: "trainerTitle", js: "trainerTitle", typ: "" },
        { json: "trainerQuote", js: "trainerQuote", typ: "" },
        { json: "iconUrl", js: "iconUrl", typ: "" },
        { json: "backdropImageBundle", js: "backdropImageBundle", typ: u(undefined, r("BackdropImageBundle")) },
        { json: "modelName", js: "modelName", typ: "" },
        { json: "tutorialOnLossString", js: "tutorialOnLossString", typ: u(undefined, "") },
        { json: "isMale", js: "isMale", typ: u(undefined, true) },
        { json: "obPartySelectionMusic", js: "obPartySelectionMusic", typ: u(undefined, r("ObPartySelectionMusic")) },
        { json: "obCombatMusic", js: "obCombatMusic", typ: u(undefined, r("ObCombatMusic")) },
    ], false),
    "InvasionNpcDisplaySettingsAvatar": o([
        { json: "avatar", js: "avatar", typ: u(undefined, 0) },
        { json: "skin", js: "skin", typ: u(undefined, 0) },
        { json: "avatarHair", js: "avatarHair", typ: u(undefined, "") },
        { json: "avatarShirt", js: "avatarShirt", typ: u(undefined, "") },
        { json: "avatarPants", js: "avatarPants", typ: u(undefined, "") },
        { json: "avatarHat", js: "avatarHat", typ: u(undefined, "") },
        { json: "avatarShoes", js: "avatarShoes", typ: u(undefined, "") },
        { json: "avatarEyes", js: "avatarEyes", typ: u(undefined, r("AvatarEyes")) },
        { json: "avatarBackpack", js: "avatarBackpack", typ: u(undefined, "") },
        { json: "avatarGloves", js: "avatarGloves", typ: u(undefined, "") },
        { json: "avatarSocks", js: "avatarSocks", typ: u(undefined, "") },
        { json: "avatarBelt", js: "avatarBelt", typ: u(undefined, "") },
        { json: "avatarGlasses", js: "avatarGlasses", typ: u(undefined, "") },
        { json: "avatarNecklace", js: "avatarNecklace", typ: u(undefined, "") },
        { json: "avatarPose", js: "avatarPose", typ: u(undefined, "") },
        { json: "avatarFace", js: "avatarFace", typ: u(undefined, r("AvatarFace")) },
    ], false),
    "InventorySettings": o([
        { json: "maxPokemon", js: "maxPokemon", typ: 0 },
        { json: "maxBagItems", js: "maxBagItems", typ: 0 },
        { json: "basePokemon", js: "basePokemon", typ: 0 },
        { json: "baseBagItems", js: "baseBagItems", typ: 0 },
        { json: "baseEggs", js: "baseEggs", typ: 0 },
        { json: "maxTeamChanges", js: "maxTeamChanges", typ: 0 },
        { json: "teamChangeItemResetPeriodInDays", js: "teamChangeItemResetPeriodInDays", typ: "" },
        { json: "maxItemBoostDurationMs", js: "maxItemBoostDurationMs", typ: "" },
        { json: "enableEggsNotInventory", js: "enableEggsNotInventory", typ: true },
        { json: "specialEggOverflowSpots", js: "specialEggOverflowSpots", typ: 0 },
        { json: "obEnableRaidPassOverflow", js: "obEnableRaidPassOverflow", typ: true },
        { json: "obBasePostcardStorage", js: "obBasePostcardStorage", typ: 0 },
        { json: "obMaxPostcardStorage", js: "obMaxPostcardStorage", typ: 0 },
        { json: "obEvolutionStoneAMaxCount", js: "obEvolutionStoneAMaxCount", typ: 0 },
        { json: "obPostcardExpansionEnabled", js: "obPostcardExpansionEnabled", typ: true },
    ], false),
    "ItemInventoryUpdateSettings": o([
        { json: "featureEnabled", js: "featureEnabled", typ: true },
        { json: "obItemCategorySettings", js: "obItemCategorySettings", typ: a(r("ObItemCategorySetting")) },
    ], false),
    "ObItemCategorySetting": o([
        { json: "category", js: "category", typ: a("") },
        { json: "categoryName", js: "categoryName", typ: "" },
        { json: "sortOder", js: "sortOder", typ: 0 },
    ], false),
    "ItemSettings": o([
        { json: "itemId", js: "itemId", typ: "" },
        { json: "itemType", js: "itemType", typ: u(0, "") },
        { json: "category", js: "category", typ: "" },
        { json: "globalEventTicket", js: "globalEventTicket", typ: u(undefined, r("GlobalEventTicket")) },
        { json: "dropTrainerLevel", js: "dropTrainerLevel", typ: u(undefined, 0) },
        { json: "ignoreInventorySpace", js: "ignoreInventorySpace", typ: u(undefined, true) },
        { json: "obItemSettingsNumber1", js: "obItemSettingsNumber1", typ: u(undefined, 0) },
        { json: "food", js: "food", typ: u(undefined, r("Food")) },
        { json: "incidentTicket", js: "incidentTicket", typ: u(undefined, r("IncidentTicket")) },
        { json: "potion", js: "potion", typ: u(undefined, r("Potion")) },
        { json: "incense", js: "incense", typ: u(undefined, r("Incense")) },
        { json: "eggIncubator", js: "eggIncubator", typ: u(undefined, r("EggIncubator")) },
        { json: "inventoryUpgrade", js: "inventoryUpgrade", typ: u(undefined, r("InventoryUpgrade")) },
        { json: "xpBoost", js: "xpBoost", typ: u(undefined, r("XPBoost")) },
        { json: "revive", js: "revive", typ: u(undefined, r("Revive")) },
        { json: "stardustBoost", js: "stardustBoost", typ: u(undefined, r("StardustBoost")) },
    ], false),
    "EggIncubator": o([
        { json: "incubatorType", js: "incubatorType", typ: "" },
        { json: "uses", js: "uses", typ: u(undefined, 0) },
        { json: "distanceMultiplier", js: "distanceMultiplier", typ: 3.14 },
    ], false),
    "Food": o([
        { json: "itemEffect", js: "itemEffect", typ: u(undefined, a("")) },
        { json: "itemEffectPercent", js: "itemEffectPercent", typ: u(undefined, a(3.14)) },
        { json: "growthPercent", js: "growthPercent", typ: u(undefined, 3.14) },
        { json: "berryMultiplier", js: "berryMultiplier", typ: u(undefined, 3.14) },
        { json: "remoteBerryMultiplier", js: "remoteBerryMultiplier", typ: u(undefined, 3.14) },
        { json: "numBuddyAffectionPoints", js: "numBuddyAffectionPoints", typ: u(undefined, 0) },
        { json: "mapDurationMs", js: "mapDurationMs", typ: u(undefined, "") },
        { json: "timeFullDurationMs", js: "timeFullDurationMs", typ: u(undefined, "") },
        { json: "numBuddyHungerPoints", js: "numBuddyHungerPoints", typ: u(undefined, 0) },
    ], false),
    "GlobalEventTicket": o([
        { json: "eventStartTime", js: "eventStartTime", typ: Date },
        { json: "eventEndTime", js: "eventEndTime", typ: Date },
        { json: "itemBagDescriptionKey", js: "itemBagDescriptionKey", typ: "" },
        { json: "clientEventStartTimeUtcMs", js: "clientEventStartTimeUtcMs", typ: "" },
        { json: "clientEventEndTimeUtcMs", js: "clientEventEndTimeUtcMs", typ: "" },
        { json: "eventBadge", js: "eventBadge", typ: u(undefined, "") },
        { json: "grantBadgeBeforeEventStartMs", js: "grantBadgeBeforeEventStartMs", typ: u(undefined, "") },
        { json: "obIsTicketEligibleForGifting", js: "obIsTicketEligibleForGifting", typ: u(undefined, true) },
        { json: "obTicketToGift", js: "obTicketToGift", typ: u(undefined, "") },
        { json: "obTicketShopImageUrl", js: "obTicketShopImageUrl", typ: u(undefined, "") },
        { json: "obTicket1", js: "obTicket1", typ: u(undefined, "") },
    ], false),
    "Incense": o([
        { json: "incenseLifetimeSeconds", js: "incenseLifetimeSeconds", typ: 0 },
        { json: "spawnTableProbability", js: "spawnTableProbability", typ: u(undefined, 3.14) },
    ], false),
    "IncidentTicket": o([
        { json: "ignoreFullInventory", js: "ignoreFullInventory", typ: u(undefined, true) },
        { json: "upgradeRequirementCount", js: "upgradeRequirementCount", typ: u(undefined, 0) },
        { json: "upgradedItem", js: "upgradedItem", typ: u(undefined, "") },
    ], false),
    "InventoryUpgrade": o([
        { json: "additionalStorage", js: "additionalStorage", typ: 0 },
        { json: "upgradeType", js: "upgradeType", typ: "" },
    ], false),
    "Potion": o([
        { json: "staAmount", js: "staAmount", typ: u(undefined, 0) },
        { json: "staPercent", js: "staPercent", typ: u(undefined, 3.14) },
    ], false),
    "Revive": o([
        { json: "staPercent", js: "staPercent", typ: 3.14 },
    ], false),
    "StardustBoost": o([
        { json: "stardustMultiplier", js: "stardustMultiplier", typ: 3.14 },
        { json: "boostDurationMs", js: "boostDurationMs", typ: 0 },
    ], false),
    "XPBoost": o([
        { json: "xpMultiplier", js: "xpMultiplier", typ: 3.14 },
        { json: "boostDurationMs", js: "boostDurationMs", typ: 0 },
    ], false),
    "LevelUpRewardSettings": o([
        { json: "level", js: "level", typ: 0 },
        { json: "items", js: "items", typ: a("") },
        { json: "itemsCount", js: "itemsCount", typ: a(0) },
        { json: "itemsUnlocked", js: "itemsUnlocked", typ: u(undefined, a("")) },
        { json: "avatarTemplateIds", js: "avatarTemplateIds", typ: u(undefined, a("")) },
    ], false),
    "LimitedPurchaseSkuSettings": o([
        { json: "purchaseLimit", js: "purchaseLimit", typ: 0 },
        { json: "chronoUnit", js: "chronoUnit", typ: u(undefined, "") },
        { json: "lootTableId", js: "lootTableId", typ: u(undefined, "") },
        { json: "resetInterval", js: "resetInterval", typ: u(undefined, 0) },
        { json: "version", js: "version", typ: u(undefined, 0) },
    ], false),
    "LoadingScreenSettings": o([
        { json: "url", js: "url", typ: "" },
        { json: "displayAfterTimestampMs", js: "displayAfterTimestampMs", typ: "" },
        { json: "colorSettings", js: "colorSettings", typ: r("ColorSettings") },
    ], false),
    "ColorSettings": o([
        { json: "warning_text", js: "warning_text", typ: "" },
        { json: "progress_background", js: "progress_background", typ: "" },
        { json: "progress_bar_left", js: "progress_bar_left", typ: "" },
        { json: "progress_bar_right", js: "progress_bar_right", typ: "" },
    ], false),
    "LuckyPokemonSettings": o([
        { json: "powerUpStardustDiscountPercent", js: "powerUpStardustDiscountPercent", typ: 3.14 },
    ], false),
    "MapDisplaySettings": o([
        { json: "showEnhancedSky", js: "showEnhancedSky", typ: true },
    ], false),
    "MegaEvoSettings": o([
        { json: "evolutionLengthMs", js: "evolutionLengthMs", typ: "" },
        { json: "attackBoostFromMegaDifferentType", js: "attackBoostFromMegaDifferentType", typ: 3.14 },
        { json: "attackBoostFromMegaSameType", js: "attackBoostFromMegaSameType", typ: 3.14 },
        { json: "maxCandyHoardSize", js: "maxCandyHoardSize", typ: 0 },
        { json: "enableBuddyWalkingMegaEnergyAward", js: "enableBuddyWalkingMegaEnergyAward", typ: true },
        { json: "activeMegaBonusCatchCandy", js: "activeMegaBonusCatchCandy", typ: 0 },
        { json: "obMegaLevelSettingsSharedBool1", js: "obMegaLevelSettingsSharedBool1", typ: true },
        { json: "obMegaLevelSettingsSharedBool2", js: "obMegaLevelSettingsSharedBool2", typ: true },
        { json: "obMaxMegaLevels", js: "obMaxMegaLevels", typ: 0 },
        { json: "obSharedMegaEvoNumber1", js: "obSharedMegaEvoNumber1", typ: 0 },
        { json: "obMegaLevelEnabled", js: "obMegaLevelEnabled", typ: true },
    ], false),
    "MonodepthSettings": o([
        { json: "enableOcclusions", js: "enableOcclusions", typ: true },
        { json: "occlusionsDefaultOn", js: "occlusionsDefaultOn", typ: true },
        { json: "occlusionsToggleVisible", js: "occlusionsToggleVisible", typ: true },
        { json: "enableGroundSuppression", js: "enableGroundSuppression", typ: true },
        { json: "minGroundSuppressionThresh", js: "minGroundSuppressionThresh", typ: 3.14 },
        { json: "suppressionChannelId", js: "suppressionChannelId", typ: 0 },
    ], false),
    "MoveSequenceSettings": o([
        { json: "sequence", js: "sequence", typ: a("") },
    ], false),
    "MoveSettings": o([
        { json: "movementId", js: "movementId", typ: u(0, "") },
        { json: "animationId", js: "animationId", typ: 0 },
        { json: "pokemonType", js: "pokemonType", typ: r("TypeElement") },
        { json: "power", js: "power", typ: u(undefined, 3.14) },
        { json: "accuracyChance", js: "accuracyChance", typ: 3.14 },
        { json: "criticalChance", js: "criticalChance", typ: u(undefined, 3.14) },
        { json: "staminaLossScalar", js: "staminaLossScalar", typ: u(undefined, 3.14) },
        { json: "trainerLevelMin", js: "trainerLevelMin", typ: u(undefined, 0) },
        { json: "trainerLevelMax", js: "trainerLevelMax", typ: u(undefined, 0) },
        { json: "vfxName", js: "vfxName", typ: "" },
        { json: "durationMs", js: "durationMs", typ: 0 },
        { json: "damageWindowStartMs", js: "damageWindowStartMs", typ: 0 },
        { json: "damageWindowEndMs", js: "damageWindowEndMs", typ: 0 },
        { json: "energyDelta", js: "energyDelta", typ: u(undefined, 0) },
        { json: "healScalar", js: "healScalar", typ: u(undefined, 3.14) },
        { json: "isLocked", js: "isLocked", typ: u(undefined, true) },
    ], false),
    "NewsFeedClientSettings": o([
        { json: "isNewsFeedPollingEnabled", js: "isNewsFeedPollingEnabled", typ: true },
        { json: "getNewsFeedPollingRateMinutes", js: "getNewsFeedPollingRateMinutes", typ: 0 },
    ], false),
    "ObAdvancedSettings": o([
        { json: "obDownloadAllAssetsEnabled", js: "obDownloadAllAssetsEnabled", typ: true },
    ], false),
    "ObAssetRefreshSettings": o([
        { json: "obCheckForNewAssetsTimeSeconds", js: "obCheckForNewAssetsTimeSeconds", typ: 0 },
    ], false),
    "ObBattleVisualSettings": o([
        { json: "obBattleVisualStadiumEnabled", js: "obBattleVisualStadiumEnabled", typ: true },
        { json: "obStadiumCrowdAsset", js: "obStadiumCrowdAsset", typ: "" },
        { json: "obStadiumBannerAsset", js: "obStadiumBannerAsset", typ: "" },
    ], false),
    "ObCampfireSettings": o([
        { json: "obCampfireAccessEnabled", js: "obCampfireAccessEnabled", typ: true },
        { json: "obCampfireMapButtonEnabled", js: "obCampfireMapButtonEnabled", typ: true },
        { json: "obCatchCardEnabled", js: "obCatchCardEnabled", typ: true },
        { json: "obCatchCardShareEnabled", js: "obCatchCardShareEnabled", typ: true },
        { json: "obCatchCardTimeToShareToCampfireS", js: "obCatchCardTimeToShareToCampfireS", typ: 0 },
        { json: "obCatchCardShareToCampfireEnabled", js: "obCatchCardShareToCampfireEnabled", typ: true },
    ], false),
    "ObCatchRadiusMultiplierSettings": o([
        { json: "obCatchRadiusMultiplierEnabled", js: "obCatchRadiusMultiplierEnabled", typ: true },
    ], false),
    "ObContestSettings": o([
        { json: "obContestSettingsBool1", js: "obContestSettingsBool1", typ: true },
        { json: "obContestSettingsNumber1", js: "obContestSettingsNumber1", typ: 0 },
        { json: "obContestIncidents", js: "obContestIncidents", typ: a(r("ObContestIncident")) },
        { json: "obContestSettingsNumber2", js: "obContestSettingsNumber2", typ: 0 },
        { json: "obContestSettingsNumber3", js: "obContestSettingsNumber3", typ: "" },
        { json: "obContestOccurrenceSettings", js: "obContestOccurrenceSettings", typ: a(r("ObContestOccurrenceSetting")) },
        { json: "obContestSettingsNumber4", js: "obContestSettingsNumber4", typ: "" },
        { json: "obContestSettingsNumber5", js: "obContestSettingsNumber5", typ: "" },
        { json: "obContestSettingsNumber6", js: "obContestSettingsNumber6", typ: 3.14 },
        { json: "obContestSettingsNumber7", js: "obContestSettingsNumber7", typ: 3.14 },
        { json: "obContestTypes", js: "obContestTypes", typ: a(r("ObContestType")) },
        { json: "obContestDurations", js: "obContestDurations", typ: a(r("ObContestDuration")) },
    ], false),
    "ObContestDuration": o([
        { json: "obDurationName", js: "obDurationName", typ: "" },
        { json: "obDurationMinMs", js: "obDurationMinMs", typ: "" },
        { json: "obDurationMaxMs", js: "obDurationMaxMs", typ: "" },
    ], false),
    "ObContestIncident": o([
        { json: "obContestTypeSettings", js: "obContestTypeSettings", typ: r("ObContestTypeSettings") },
        { json: "obContestOccurrence", js: "obContestOccurrence", typ: "" },
        { json: "obContestIncidentNumber1", js: "obContestIncidentNumber1", typ: 0 },
    ], false),
    "ObContestTypeSettings": o([
        { json: "pokemonMetric", js: "pokemonMetric", typ: "" },
        { json: "rankingStandard", js: "rankingStandard", typ: "" },
    ], false),
    "ObContestOccurrenceSetting": o([
        { json: "obContestOccurrence", js: "obContestOccurrence", typ: "" },
        { json: "obContestClaimRewardNumber1Ms", js: "obContestClaimRewardNumber1Ms", typ: "" },
        { json: "obContestClaimRewardNumber2Ms", js: "obContestClaimRewardNumber2Ms", typ: "" },
    ], false),
    "ObContestType": o([
        { json: "obPokemonSize", js: "obPokemonSize", typ: r("ObPokemonSize") },
    ], false),
    "ObPokemonSize": o([
        { json: "obSizeSortPredicateNumber1", js: "obSizeSortPredicateNumber1", typ: 3.14 },
        { json: "obSizeSortPredicateNumber2", js: "obSizeSortPredicateNumber2", typ: 3.14 },
        { json: "obSizeSortPredicateNumber3", js: "obSizeSortPredicateNumber3", typ: 3.14 },
    ], false),
    "ObDailyAdventureIncenseSettings": o([
        { json: "enabled", js: "enabled", typ: true },
        { json: "obPokeballThresholdToRewardLoot", js: "obPokeballThresholdToRewardLoot", typ: 0 },
        { json: "obRewards", js: "obRewards", typ: r("ObRewards") },
        { json: "obDailyAdventureIncenseResetTime", js: "obDailyAdventureIncenseResetTime", typ: "" },
        { json: "obDailyAdventureIncenseSettingsBool1", js: "obDailyAdventureIncenseSettingsBool1", typ: true },
        { json: "obPaceMultiplier", js: "obPaceMultiplier", typ: 0 },
    ], false),
    "ObRewards": o([
        { json: "lootItem", js: "lootItem", typ: a(r("LootItem")) },
    ], false),
    "LootItem": o([
        { json: "item", js: "item", typ: "" },
        { json: "count", js: "count", typ: 0 },
    ], false),
    "ObEggHatchImprovementSettings": o([
        { json: "featureEnabled", js: "featureEnabled", typ: true },
        { json: "obEggHatchAnimationDelayMs", js: "obEggHatchAnimationDelayMs", typ: 0 },
        { json: "obEggHatchAnimationInteruptionDelayMs", js: "obEggHatchAnimationInteruptionDelayMs", typ: 0 },
    ], false),
    "ObEvolutionChainDisplaySettings": o([
        { json: "pokemon", js: "pokemon", typ: "" },
        { json: "obChain", js: "obChain", typ: a(r("ObChain")) },
    ], false),
    "ObChain": o([
        { json: "obEvolutionChainEntry", js: "obEvolutionChainEntry", typ: a(r("ObEvolutionChainEntry")) },
        { json: "obPokedexHeader", js: "obPokedexHeader", typ: u(undefined, r("ObPokedexHeader")) },
    ], false),
    "ObEvolutionChainEntry": o([
        { json: "pokemon", js: "pokemon", typ: "" },
        { json: "form", js: "form", typ: u(undefined, "") },
        { json: "gender", js: "gender", typ: u(undefined, r("GenderRequirementEnum")) },
    ], false),
    "ObEvolvePreviewSettings": o([
        { json: "obEnableEvolutionPreview", js: "obEnableEvolutionPreview", typ: true },
        { json: "obEnableMegaEvolutionPreview", js: "obEnableMegaEvolutionPreview", typ: true },
    ], false),
    "ObFeatureUnlockSettings": o([
        { json: "obBulkPostcardDeleteEnabled", js: "obBulkPostcardDeleteEnabled", typ: 0 },
        { json: "obFeatureUnlockSettingsNumber3", js: "obFeatureUnlockSettingsNumber3", typ: 0 },
    ], false),
    "ObFormsRefactorSettings": o([
        { json: "obFormsRefactorSettingsBool1", js: "obFormsRefactorSettingsBool1", typ: true },
        { json: "obFormsRefactorSettingsBool2", js: "obFormsRefactorSettingsBool2", typ: true },
        { json: "obFormsRefactorSettingsBool3", js: "obFormsRefactorSettingsBool3", typ: true },
        { json: "obEnableSingularShadowForm", js: "obEnableSingularShadowForm", typ: true },
    ], false),
    "ObFortPowerUpSettings": o([
        { json: "level", js: "level", typ: "" },
        { json: "obPointsNeededForLevelUp", js: "obPointsNeededForLevelUp", typ: u(undefined, 0) },
        { json: "obPowerUpReward", js: "obPowerUpReward", typ: u(undefined, a("")) },
        { json: "obDurationOfPowerUpMs", js: "obDurationOfPowerUpMs", typ: u(undefined, 0) },
    ], false),
    "ObGameMasterLanguageSettings": o([
        { json: "language", js: "language", typ: "" },
        { json: "isEnabled", js: "isEnabled", typ: u(undefined, true) },
    ], false),
    "ObGameMasterSettings15": o([
        { json: "obEnabled", js: "obEnabled", typ: true },
    ], false),
    "ObGameMasterSettings16": o([
        { json: "obGameMasterSettings16Bool1", js: "obGameMasterSettings16Bool1", typ: true },
    ], false),
    "ObGiftingSettings": o([
        { json: "obConvertItemsToStardustWhenFullEnabled", js: "obConvertItemsToStardustWhenFullEnabled", typ: true },
        { json: "obStardustToRewardWhenFull", js: "obStardustToRewardWhenFull", typ: 0 },
        { json: "stardustMultiplier", js: "stardustMultiplier", typ: a(r("StardustMultiplier")) },
    ], false),
    "StardustMultiplier": o([
        { json: "obStardustBaseMultiplier", js: "obStardustBaseMultiplier", typ: 3.14 },
        { json: "obStardustMultiplierProbability", js: "obStardustMultiplierProbability", typ: 3.14 },
    ], false),
    "ObImpressionTrackingSettings": o([
        { json: "obImpressionTrackingSettingsBool1", js: "obImpressionTrackingSettingsBool1", typ: true },
        { json: "obImpressionTrackingSettingsBool2", js: "obImpressionTrackingSettingsBool2", typ: true },
        { json: "obImpressionTrackingSettingsBool4", js: "obImpressionTrackingSettingsBool4", typ: true },
        { json: "obImpressionTrackingSettingsBool5", js: "obImpressionTrackingSettingsBool5", typ: true },
        { json: "obImpressionTrackingSettingsBool6", js: "obImpressionTrackingSettingsBool6", typ: true },
    ], false),
    "ObInAppSurveySettings": o([
        { json: "obInAppSurveyNumber1", js: "obInAppSurveyNumber1", typ: 0 },
    ], false),
    "ObIncubatorFlowSettings": o([
        { json: "obIncubatorFlowSettingsBool1", js: "obIncubatorFlowSettingsBool1", typ: true },
        { json: "obIncubatorFlowSettingsBool2", js: "obIncubatorFlowSettingsBool2", typ: true },
    ], false),
    "ObInteractionRangeSettings": o([
        { json: "interactionRangeMeters", js: "interactionRangeMeters", typ: 3.14 },
        { json: "farInteractionRangeMeters", js: "farInteractionRangeMeters", typ: 3.14 },
        { json: "remoteInteractionRangeMeters", js: "remoteInteractionRangeMeters", typ: 3.14 },
    ], false),
    "ObInvasionCharacterSettings": o([
        { json: "obInvasionCharacter", js: "obInvasionCharacter", typ: a("") },
    ], false),
    "ObLanguageSelectorSettings": o([
        { json: "obLanguageSelectorEnabled", js: "obLanguageSelectorEnabled", typ: true },
    ], false),
    "ObSettings": o([
        { json: "enabled", js: "enabled", typ: true },
    ], false),
    "ObLocationCardSettings": o([
        { json: "locationCard", js: "locationCard", typ: u(0, "") },
        { json: "headerKey", js: "headerKey", typ: "" },
    ], false),
    "ObMegaLevelSettings": o([
        { json: "obMegaLevelUnlockSettings", js: "obMegaLevelUnlockSettings", typ: r("ObMegaLevelUnlockSettings") },
        { json: "obMegaLevelCooldownSettings", js: "obMegaLevelCooldownSettings", typ: r("ObMegaLevelCooldownSettings") },
        { json: "obMegaLevelPerks", js: "obMegaLevelPerks", typ: r("ObMegaLevelPerks") },
        { json: "pokemonId", js: "pokemonId", typ: u(undefined, "") },
        { json: "level", js: "level", typ: u(undefined, 0) },
    ], false),
    "ObMegaLevelCooldownSettings": o([
        { json: "durationMs", js: "durationMs", typ: "" },
        { json: "obMaxMegaCandyRequired", js: "obMaxMegaCandyRequired", typ: 0 },
        { json: "obGameMasterSettings2Message2Number3", js: "obGameMasterSettings2Message2Number3", typ: 0 },
    ], false),
    "ObMegaLevelPerks": o([
        { json: "obMegaPerkAttackBoostFromMegaDifferentType", js: "obMegaPerkAttackBoostFromMegaDifferentType", typ: 3.14 },
        { json: "obMegaPerkAttackBoostFromMegaSameType", js: "obMegaPerkAttackBoostFromMegaSameType", typ: 3.14 },
        { json: "obMegaPerkActiveMegaBonusCatchCandy", js: "obMegaPerkActiveMegaBonusCatchCandy", typ: 0 },
        { json: "obMegaPerkXpCatchBonus", js: "obMegaPerkXpCatchBonus", typ: u(undefined, 0) },
        { json: "obMegaPerkXlCandyBonusChance", js: "obMegaPerkXlCandyBonusChance", typ: u(undefined, 3.14) },
    ], false),
    "ObMegaLevelUnlockSettings": o([
        { json: "obGameMasterSettings2Message1Number2", js: "obGameMasterSettings2Message1Number2", typ: 0 },
        { json: "obGameMasterSettings2Message1Number3", js: "obGameMasterSettings2Message1Number3", typ: 0 },
        { json: "obMegaEvolutionsRequiredToUnlock", js: "obMegaEvolutionsRequiredToUnlock", typ: u(undefined, 0) },
    ], false),
    "ObPhotoSettings": o([
        { json: "obResolutionSaveMultiplier", js: "obResolutionSaveMultiplier", typ: 3.14 },
    ], false),
    "ObPokedexCategoriesSettings": o([
        { json: "featureEnabled", js: "featureEnabled", typ: true },
        { json: "obSpecialCategories", js: "obSpecialCategories", typ: a(r("ObSpecialCategory")) },
        { json: "obPokedexCategoriesSettingsBool1", js: "obPokedexCategoriesSettingsBool1", typ: true },
        { json: "obEnablePokedexSearch", js: "obEnablePokedexSearch", typ: true },
    ], false),
    "ObSpecialCategory": o([
        { json: "obPokedexCategory", js: "obPokedexCategory", typ: "" },
        { json: "obCategoryObtainedUnlockRequirement", js: "obCategoryObtainedUnlockRequirement", typ: 0 },
    ], false),
    "ObPokemonFxSettings": o([
        { json: "obPokemonFxBool10", js: "obPokemonFxBool10", typ: true },
    ], false),
    "ObPopupControlSettings": o([
        { json: "obPopupControlSettingsBool4", js: "obPopupControlSettingsBool4", typ: true },
        { json: "obPopupControlSettingsBool11", js: "obPopupControlSettingsBool11", typ: true },
        { json: "obPopupControlSettingsBool12", js: "obPopupControlSettingsBool12", typ: true },
    ], false),
    "ObPowerUpPoiSettings": o([
        { json: "obMinPlayerLevelForScanning", js: "obMinPlayerLevelForScanning", typ: 0 },
        { json: "obPointsMultiplier", js: "obPointsMultiplier", typ: 3.14 },
    ], false),
    "ObPrimalEvoSettings": o([
        { json: "obPrimalBoostSettings", js: "obPrimalBoostSettings", typ: r("ObPrimalBoostSettings") },
        { json: "obPrimalMaxCandyHoardSize", js: "obPrimalMaxCandyHoardSize", typ: 0 },
        { json: "obPrimalTypeBoostBonusSettings", js: "obPrimalTypeBoostBonusSettings", typ: a(r("ObPrimalTypeBoostBonusSetting")) },
    ], false),
    "ObPrimalBoostSettings": o([
        { json: "evolutionLengthMs", js: "evolutionLengthMs", typ: "" },
        { json: "obPrimalEvoSettingsNumber2", js: "obPrimalEvoSettingsNumber2", typ: 0 },
        { json: "obPrimalTypeBoostEnabled", js: "obPrimalTypeBoostEnabled", typ: true },
    ], false),
    "ObPrimalTypeBoostBonusSetting": o([
        { json: "obPokemon", js: "obPokemon", typ: "" },
        { json: "obTypes", js: "obTypes", typ: a(r("TypeElement")) },
    ], false),
    "ObPushGatewaySettings": o([
        { json: "obPushGatewayMinLevel1", js: "obPushGatewayMinLevel1", typ: 0 },
        { json: "obPushGatewayMinLevel2", js: "obPushGatewayMinLevel2", typ: 0 },
    ], false),
    "ObRAIDLobbyCounterSettings": o([
        { json: "obRaidLobbyCounterSettingsBool1", js: "obRaidLobbyCounterSettingsBool1", typ: true },
        { json: "obRaidLobbyCounterSettingsNumber1", js: "obRaidLobbyCounterSettingsNumber1", typ: 0 },
        { json: "obWebsocketRaidLobbyUpdateEnabled1", js: "obWebsocketRaidLobbyUpdateEnabled1", typ: true },
        { json: "obRaidLobbyCounterSettingsBool3", js: "obRaidLobbyCounterSettingsBool3", typ: true },
        { json: "obWebsocketRaidLobbyUpdateEnabled2", js: "obWebsocketRaidLobbyUpdateEnabled2", typ: true },
        { json: "obWebsocketRaidLobbyUpdateEnabled3", js: "obWebsocketRaidLobbyUpdateEnabled3", typ: true },
        { json: "obRaidLobbyCounterSettingsFloat1", js: "obRaidLobbyCounterSettingsFloat1", typ: 3.14 },
        { json: "obRaidLobbyCounterSettingsNumber2", js: "obRaidLobbyCounterSettingsNumber2", typ: 0 },
        { json: "obRaidLobbyCounterSettingsNumber3", js: "obRaidLobbyCounterSettingsNumber3", typ: 0 },
        { json: "obRaidLobbyCounterSettingsString1", js: "obRaidLobbyCounterSettingsString1", typ: "" },
        { json: "obRaidLobbyCounterSettingsFloat2", js: "obRaidLobbyCounterSettingsFloat2", typ: 3.14 },
        { json: "obRaidLobbyCounterSettingsNumber4", js: "obRaidLobbyCounterSettingsNumber4", typ: 0 },
    ], false),
    "ObRemoteRAIDLimitSettings": o([
        { json: "enabled", js: "enabled", typ: true },
        { json: "obRemoteRaidUseableLimit", js: "obRemoteRaidUseableLimit", typ: 0 },
    ], false),
    "ObRouteStampCategorySettings": o([
        { json: "category", js: "category", typ: "" },
        { json: "obRouteStampCategoryNumber1", js: "obRouteStampCategoryNumber1", typ: 0 },
        { json: "sortOrder", js: "sortOrder", typ: 0 },
        { json: "obIsRouteStampCategoryDefault", js: "obIsRouteStampCategoryDefault", typ: true },
    ], false),
    "ObSharedMoveSettings": o([
        { json: "staPercent", js: "staPercent", typ: 3.14 },
        { json: "atkPercent", js: "atkPercent", typ: 3.14 },
        { json: "defPercent", js: "defPercent", typ: 3.14 },
        { json: "durationS", js: "durationS", typ: 3.14 },
    ], false),
    "ObStickerCategorySettings": o([
        { json: "enabled", js: "enabled", typ: true },
        { json: "obStickerCategory", js: "obStickerCategory", typ: a(r("ObStickerCategoryClass")) },
    ], false),
    "ObStickerCategoryClass": o([
        { json: "category", js: "category", typ: "" },
        { json: "sortOrder", js: "sortOrder", typ: 0 },
        { json: "obStickerCategoryEnabled", js: "obStickerCategoryEnabled", typ: true },
        { json: "obStickerCategoryIconAssetBundle", js: "obStickerCategoryIconAssetBundle", typ: u(undefined, "") },
    ], false),
    "ObStyleShopSettings": o([
        { json: "obTodayViewSettingsBool1", js: "obTodayViewSettingsBool1", typ: true },
        { json: "obStyleShopV2Enabled", js: "obStyleShopV2Enabled", typ: true },
        { json: "obStyleShopV2PossibleFeaturedItems", js: "obStyleShopV2PossibleFeaturedItems", typ: a("") },
    ], false),
    "ObTicketGiftingSettings": o([
        { json: "minPlayerLevel", js: "minPlayerLevel", typ: 0 },
        { json: "obMaxNumberOfGiftsPerDay", js: "obMaxNumberOfGiftsPerDay", typ: 0 },
        { json: "obTicketGiftSettingsString1", js: "obTicketGiftSettingsString1", typ: "" },
    ], false),
    "ObTutorialSettings": o([
        { json: "obTutorialSettingsBool2", js: "obTutorialSettingsBool2", typ: true },
        { json: "obTutorialSettingsBool3", js: "obTutorialSettingsBool3", typ: true },
        { json: "obTutorialSettingsBool4", js: "obTutorialSettingsBool4", typ: true },
        { json: "obTutorialSettingsBool5", js: "obTutorialSettingsBool5", typ: true },
        { json: "obTutorialSettingsBool6", js: "obTutorialSettingsBool6", typ: true },
        { json: "obTutorialSettingsBool7", js: "obTutorialSettingsBool7", typ: true },
        { json: "obTutorialSettingsBool8", js: "obTutorialSettingsBool8", typ: true },
        { json: "obTutorialSettingsBool9", js: "obTutorialSettingsBool9", typ: true },
        { json: "obTutorialSettingsBool10", js: "obTutorialSettingsBool10", typ: true },
        { json: "obTutorialSettingsBool11", js: "obTutorialSettingsBool11", typ: true },
        { json: "obTutorialCompleteReward", js: "obTutorialCompleteReward", typ: a(r("ObTutorialCompleteReward")) },
    ], false),
    "ObTutorialCompleteReward": o([
        { json: "obTutorial", js: "obTutorial", typ: "" },
        { json: "itemReward", js: "itemReward", typ: a(r("ItemReward")) },
    ], false),
    "ItemReward": o([
        { json: "itemId", js: "itemId", typ: "" },
        { json: "amount", js: "amount", typ: 0 },
    ], false),
    "ObUsernameSuggestionSettings": o([
        { json: "obFeatureEnabled", js: "obFeatureEnabled", typ: true },
        { json: "obUsernameSuggestionNumber1", js: "obUsernameSuggestionNumber1", typ: 0 },
        { json: "obUsernameSuggestionNumber2", js: "obUsernameSuggestionNumber2", typ: 0 },
    ], false),
    "ObVerboseCombatSetting": o([
        { json: "enabled", js: "enabled", typ: true },
        { json: "obVerboseCombatSettingsBool1", js: "obVerboseCombatSettingsBool1", typ: true },
        { json: "obVerboseCombatSettingsBool2", js: "obVerboseCombatSettingsBool2", typ: true },
        { json: "obVerboseCombatSettingsBool3", js: "obVerboseCombatSettingsBool3", typ: true },
        { json: "obVerboseCombatSettingsBool4", js: "obVerboseCombatSettingsBool4", typ: true },
        { json: "obVerboseRaidShared1Bool8", js: "obVerboseRaidShared1Bool8", typ: true },
        { json: "obVerboseRaidShared2Bool9", js: "obVerboseRaidShared2Bool9", typ: true },
        { json: "obVerboseRaidShared3Bool9", js: "obVerboseRaidShared3Bool9", typ: true },
        { json: "obVerboseRaidShared4Bool9", js: "obVerboseRaidShared4Bool9", typ: true },
        { json: "obVerboseCombatSettingsNumber1", js: "obVerboseCombatSettingsNumber1", typ: 0 },
        { json: "obVerboseCombatSettingsBool5", js: "obVerboseCombatSettingsBool5", typ: true },
        { json: "obVerboseCombatSettingsNumber2", js: "obVerboseCombatSettingsNumber2", typ: 0 },
    ], false),
    "ObVpsEventSettings": o([
        { json: "fortVpsEvents", js: "fortVpsEvents", typ: a(r("FortVpsEvent")) },
    ], false),
    "FortVpsEvent": o([
        { json: "fortId", js: "fortId", typ: "" },
        { json: "startTimeMs", js: "startTimeMs", typ: "" },
        { json: "endTimeMs", js: "endTimeMs", typ: "" },
        { json: "vpsEvent", js: "vpsEvent", typ: r("VpsEvent") },
    ], false),
    "VpsEvent": o([
        { json: "obVpsEventAction", js: "obVpsEventAction", typ: "" },
    ], false),
    "ObVsSeekerScheduleSettings": o([
        { json: "obVsSeekerScheduleSettingEnabled", js: "obVsSeekerScheduleSettingEnabled", typ: true },
        { json: "obVsSeekerScheduleSettingBool2", js: "obVsSeekerScheduleSettingBool2", typ: true },
        { json: "obVsSeekerScheduleSettingBool3", js: "obVsSeekerScheduleSettingBool3", typ: true },
        { json: "obVsSeekerSchedule", js: "obVsSeekerSchedule", typ: a(r("ObVsSeekerSchedule")) },
    ], false),
    "ObVsSeekerSchedule": o([
        { json: "obVsSeekerSeasonName", js: "obVsSeekerSeasonName", typ: "" },
        { json: "descriptionKey", js: "descriptionKey", typ: "" },
        { json: "obVsSeekerScheduleWindowDetails", js: "obVsSeekerScheduleWindowDetails", typ: a(r("ObVsSeekerScheduleWindowDetail")) },
        { json: "obVsSeekerSeasonBlogUrl", js: "obVsSeekerSeasonBlogUrl", typ: "" },
    ], false),
    "ObVsSeekerScheduleWindowDetail": o([
        { json: "startTimeMs", js: "startTimeMs", typ: "" },
        { json: "endTimeMs", js: "endTimeMs", typ: "" },
        { json: "obVsSeekerCupsInWindow", js: "obVsSeekerCupsInWindow", typ: a("") },
    ], false),
    "OnboardingSettings": o([
        { json: "obOnboardingSettingsNumber1", js: "obOnboardingSettingsNumber1", typ: 0 },
    ], false),
    "OnboardingV2Settings": o([
        { json: "pokedexId", js: "pokedexId", typ: a("") },
        { json: "eggKmUntilHatch", js: "eggKmUntilHatch", typ: 0 },
    ], false),
    "PartyRecommendationSettings": o([
        { json: "mode", js: "mode", typ: "" },
        { json: "variance", js: "variance", typ: 3.14 },
        { json: "thirdMoveWeight", js: "thirdMoveWeight", typ: 3.14 },
        { json: "megaEvoCombatRatingScale", js: "megaEvoCombatRatingScale", typ: 3.14 },
    ], false),
    "PlatypusRolloutSettings": o([
        { json: "buddyV2MinPlayerLevel", js: "buddyV2MinPlayerLevel", typ: 0 },
        { json: "buddyMultiplayerMinPlayerLevel", js: "buddyMultiplayerMinPlayerLevel", typ: 0 },
    ], false),
    "PlayerLevel": o([
        { json: "rankNum", js: "rankNum", typ: a(0) },
        { json: "requiredExperience", js: "requiredExperience", typ: a(0) },
        { json: "cpMultiplier", js: "cpMultiplier", typ: a(3.14) },
        { json: "maxEggPlayerLevel", js: "maxEggPlayerLevel", typ: 0 },
        { json: "maxEncounterPlayerLevel", js: "maxEncounterPlayerLevel", typ: 0 },
        { json: "maxQuestEncounterPlayerLevel", js: "maxQuestEncounterPlayerLevel", typ: 0 },
        { json: "obMaxMegaLevel", js: "obMaxMegaLevel", typ: 0 },
    ], false),
    "PokedexSizeStatsSettings": o([
        { json: "obPokedexSizeStatFeatureEnabled", js: "obPokedexSizeStatFeatureEnabled", typ: true },
        { json: "obPokemonSizeCatchRequirementToUnlockStats", js: "obPokemonSizeCatchRequirementToUnlockStats", typ: 0 },
        { json: "obPokemonWeightCatchRequirementToUnlockStats", js: "obPokemonWeightCatchRequirementToUnlockStats", typ: 0 },
        { json: "obPokedexSizeStatsSettingsFloat1", js: "obPokedexSizeStatsSettingsFloat1", typ: 3.14 },
        { json: "obPokedexSizeStatsSettingsBool2", js: "obPokedexSizeStatsSettingsBool2", typ: true },
    ], false),
    "PokemonExtendedSettings": o([
        { json: "uniqueId", js: "uniqueId", typ: "" },
        { json: "obPokemonSizeSettings", js: "obPokemonSizeSettings", typ: r("ObPokemonSizeSetting") },
        { json: "form", js: "form", typ: u(undefined, u(0, "")) },
        { json: "obExtendedOverrideSettings", js: "obExtendedOverrideSettings", typ: u(undefined, a(r("ObExtendedOverrideSetting"))) },
    ], false),
    "ObExtendedOverrideSetting": o([
        { json: "tempEvolutionId", js: "tempEvolutionId", typ: r("Temp") },
        { json: "obPokemonSizeSettings", js: "obPokemonSizeSettings", typ: r("ObPokemonSizeSettings") },
    ], false),
    "ObPokemonSizeSettings": o([
        { json: "obPokemonSizeMultiplierScale1", js: "obPokemonSizeMultiplierScale1", typ: 3.14 },
        { json: "obPokemonSizeMultiplierScale2", js: "obPokemonSizeMultiplierScale2", typ: 3.14 },
        { json: "obPokemonSizeMultiplierScale3", js: "obPokemonSizeMultiplierScale3", typ: 3.14 },
        { json: "obPokemonSizeMultiplierScale4", js: "obPokemonSizeMultiplierScale4", typ: 3.14 },
        { json: "obPokemonSizeMultiplierScale5", js: "obPokemonSizeMultiplierScale5", typ: 3.14 },
        { json: "obPokemonSizeMultiplierScale6", js: "obPokemonSizeMultiplierScale6", typ: 3.14 },
    ], false),
    "ObPokemonSizeSetting": o([
        { json: "obPokemonSizeMultiplierScale1", js: "obPokemonSizeMultiplierScale1", typ: 3.14 },
        { json: "obPokemonSizeMultiplierScale2", js: "obPokemonSizeMultiplierScale2", typ: 3.14 },
        { json: "obPokemonSizeMultiplierScale3", js: "obPokemonSizeMultiplierScale3", typ: 3.14 },
        { json: "obPokemonSizeMultiplierScale4", js: "obPokemonSizeMultiplierScale4", typ: 3.14 },
        { json: "obPokemonSizeMultiplierScale5", js: "obPokemonSizeMultiplierScale5", typ: 3.14 },
        { json: "obPokemonSizeMultiplierScale6", js: "obPokemonSizeMultiplierScale6", typ: 3.14 },
        { json: "obPokemonSizeSettingsBool2", js: "obPokemonSizeSettingsBool2", typ: u(undefined, true) },
        { json: "obPokemonSizeMultiplierScale7", js: "obPokemonSizeMultiplierScale7", typ: u(undefined, 3.14) },
        { json: "obPokemonSizeMultiplierScale8", js: "obPokemonSizeMultiplierScale8", typ: u(undefined, 3.14) },
        { json: "obPokemonSizeMultiplierScale9", js: "obPokemonSizeMultiplierScale9", typ: u(undefined, 3.14) },
        { json: "obPokemonSizeMultiplierScale10", js: "obPokemonSizeMultiplierScale10", typ: u(undefined, 3.14) },
    ], false),
    "PokemonFamily": o([
        { json: "familyId", js: "familyId", typ: "" },
        { json: "candyPerXlCandy", js: "candyPerXlCandy", typ: 0 },
        { json: "megaEvolvablePokemonId", js: "megaEvolvablePokemonId", typ: u(undefined, "") },
    ], false),
    "PokemonHomeEnergyCosts": o([
        { json: "pokemonClass", js: "pokemonClass", typ: u(undefined, r("PokemonClass")) },
        { json: "base", js: "base", typ: 0 },
        { json: "shiny", js: "shiny", typ: 0 },
        { json: "cp1001To2000", js: "cp1001To2000", typ: 0 },
        { json: "cp2001ToInf", js: "cp2001ToInf", typ: 0 },
    ], false),
    "PokemonHomeFormReversions": o([
        { json: "pokemonId", js: "pokemonId", typ: "" },
        { json: "formMapping", js: "formMapping", typ: a(r("FormMapping")) },
    ], false),
    "FormMapping": o([
        { json: "revertedForm", js: "revertedForm", typ: "" },
        { json: "unauthorizedForms", js: "unauthorizedForms", typ: a("") },
        { json: "revertedFormString", js: "revertedFormString", typ: "" },
    ], false),
    "PokemonHomeSettings": o([
        { json: "playerMinLevel", js: "playerMinLevel", typ: 0 },
        { json: "transporterMaxEnergy", js: "transporterMaxEnergy", typ: 0 },
        { json: "energySkuId", js: "energySkuId", typ: "" },
        { json: "transporterEnergyGainPerHour", js: "transporterEnergyGainPerHour", typ: 0 },
    ], false),
    "PokemonScaleSettings": o([
        { json: "pokemonScaleMode", js: "pokemonScaleMode", typ: u(undefined, "") },
        { json: "minHeight", js: "minHeight", typ: 3.14 },
        { json: "maxHeight", js: "maxHeight", typ: 3.14 },
    ], false),
    "PokemonSettings": o([
        { json: "pokemonId", js: "pokemonId", typ: "" },
        { json: "modelScale", js: "modelScale", typ: u(undefined, 3.14) },
        { json: "type", js: "type", typ: r("TypeElement") },
        { json: "type2", js: "type2", typ: u(undefined, r("TypeElement")) },
        { json: "camera", js: "camera", typ: r("PokemonSettingsCamera") },
        { json: "encounter", js: "encounter", typ: r("Encounter") },
        { json: "stats", js: "stats", typ: r("Stats") },
        { json: "quickMoves", js: "quickMoves", typ: u(undefined, a("")) },
        { json: "cinematicMoves", js: "cinematicMoves", typ: u(undefined, a(u(0, ""))) },
        { json: "animationTime", js: "animationTime", typ: u(undefined, a(3.14)) },
        { json: "evolutionIds", js: "evolutionIds", typ: u(undefined, a("")) },
        { json: "evolutionPips", js: "evolutionPips", typ: u(undefined, 0) },
        { json: "pokedexHeightM", js: "pokedexHeightM", typ: 3.14 },
        { json: "pokedexWeightKg", js: "pokedexWeightKg", typ: 3.14 },
        { json: "heightStdDev", js: "heightStdDev", typ: 3.14 },
        { json: "weightStdDev", js: "weightStdDev", typ: 3.14 },
        { json: "familyId", js: "familyId", typ: "" },
        { json: "candyToEvolve", js: "candyToEvolve", typ: u(undefined, 0) },
        { json: "kmBuddyDistance", js: "kmBuddyDistance", typ: 3.14 },
        { json: "modelHeight", js: "modelHeight", typ: u(undefined, 3.14) },
        { json: "evolutionBranch", js: "evolutionBranch", typ: u(undefined, a(r("EvolutionBranch"))) },
        { json: "modelScaleV2", js: "modelScaleV2", typ: u(undefined, 3.14) },
        { json: "buddyOffsetMale", js: "buddyOffsetMale", typ: u(undefined, a(3.14)) },
        { json: "buddyOffsetFemale", js: "buddyOffsetFemale", typ: u(undefined, a(3.14)) },
        { json: "buddyScale", js: "buddyScale", typ: u(undefined, 3.14) },
        { json: "thirdMove", js: "thirdMove", typ: r("ThirdMove") },
        { json: "isTransferable", js: "isTransferable", typ: u(undefined, true) },
        { json: "isDeployable", js: "isDeployable", typ: u(undefined, true) },
        { json: "isTradable", js: "isTradable", typ: u(undefined, true) },
        { json: "shadow", js: "shadow", typ: u(undefined, r("Shadow")) },
        { json: "buddyGroupNumber", js: "buddyGroupNumber", typ: u(undefined, 0) },
        { json: "buddyWalkedMegaEnergyAward", js: "buddyWalkedMegaEnergyAward", typ: u(undefined, 0) },
        { json: "raidBossDistanceOffset", js: "raidBossDistanceOffset", typ: u(undefined, 3.14) },
        { json: "form", js: "form", typ: u(undefined, u(0, "")) },
        { json: "disableTransferToPokemonHome", js: "disableTransferToPokemonHome", typ: u(undefined, true) },
        { json: "parentPokemonId", js: "parentPokemonId", typ: u(undefined, "") },
        { json: "buddySize", js: "buddySize", typ: u(undefined, r("BuddySize")) },
        { json: "combatShoulderCameraAngle", js: "combatShoulderCameraAngle", typ: u(undefined, a(3.14)) },
        { json: "combatDefaultCameraAngle", js: "combatDefaultCameraAngle", typ: u(undefined, a(3.14)) },
        { json: "combatPlayerFocusCameraAngle", js: "combatPlayerFocusCameraAngle", typ: u(undefined, a(3.14)) },
        { json: "eliteCinematicMove", js: "eliteCinematicMove", typ: u(undefined, a(u(0, ""))) },
        { json: "tempEvoOverrides", js: "tempEvoOverrides", typ: u(undefined, a(r("TempEvoOverride"))) },
        { json: "obCostumeEvolution", js: "obCostumeEvolution", typ: u(undefined, a("")) },
        { json: "eliteQuickMove", js: "eliteQuickMove", typ: u(undefined, a(u(0, ""))) },
        { json: "buddyPortraitOffset", js: "buddyPortraitOffset", typ: u(undefined, a(3.14)) },
        { json: "combatPlayerPokemonPositionOffset", js: "combatPlayerPokemonPositionOffset", typ: u(undefined, a(3.14)) },
        { json: "pokemonClass", js: "pokemonClass", typ: u(undefined, r("PokemonClass")) },
        { json: "combatOpponentFocusCameraAngle", js: "combatOpponentFocusCameraAngle", typ: u(undefined, a(3.14)) },
        { json: "formChange", js: "formChange", typ: u(undefined, a(r("FormChange"))) },
        { json: "obPokemonSizeSetting", js: "obPokemonSizeSetting", typ: u(undefined, r("ObPokemonSizeSetting")) },
    ], false),
    "PokemonSettingsCamera": o([
        { json: "diskRadiusM", js: "diskRadiusM", typ: u(undefined, 3.14) },
        { json: "cylinderRadiusM", js: "cylinderRadiusM", typ: u(undefined, 3.14) },
        { json: "cylinderHeightM", js: "cylinderHeightM", typ: u(undefined, 3.14) },
        { json: "shoulderModeScale", js: "shoulderModeScale", typ: u(undefined, 3.14) },
        { json: "cylinderGroundM", js: "cylinderGroundM", typ: u(undefined, 3.14) },
    ], false),
    "Encounter": o([
        { json: "collisionRadiusM", js: "collisionRadiusM", typ: u(undefined, 3.14) },
        { json: "collisionHeightM", js: "collisionHeightM", typ: u(undefined, 3.14) },
        { json: "collisionHeadRadiusM", js: "collisionHeadRadiusM", typ: u(undefined, 3.14) },
        { json: "movementType", js: "movementType", typ: u(undefined, r("MovementType")) },
        { json: "movementTimerS", js: "movementTimerS", typ: u(undefined, 3.14) },
        { json: "jumpTimeS", js: "jumpTimeS", typ: u(undefined, 3.14) },
        { json: "attackTimerS", js: "attackTimerS", typ: u(undefined, 3.14) },
        { json: "attackProbability", js: "attackProbability", typ: u(undefined, 3.14) },
        { json: "dodgeProbability", js: "dodgeProbability", typ: u(undefined, 3.14) },
        { json: "dodgeDurationS", js: "dodgeDurationS", typ: u(undefined, 3.14) },
        { json: "dodgeDistance", js: "dodgeDistance", typ: u(undefined, 3.14) },
        { json: "cameraDistance", js: "cameraDistance", typ: u(undefined, 3.14) },
        { json: "minPokemonActionFrequencyS", js: "minPokemonActionFrequencyS", typ: u(undefined, 3.14) },
        { json: "maxPokemonActionFrequencyS", js: "maxPokemonActionFrequencyS", typ: u(undefined, 3.14) },
        { json: "obShadowFormBaseCaptureRate", js: "obShadowFormBaseCaptureRate", typ: u(undefined, 3.14) },
        { json: "obShadowFormAttackProbability", js: "obShadowFormAttackProbability", typ: u(undefined, 3.14) },
        { json: "obShadowFormDodgeProbability", js: "obShadowFormDodgeProbability", typ: u(undefined, 3.14) },
        { json: "bonusCandyCaptureReward", js: "bonusCandyCaptureReward", typ: u(undefined, 0) },
        { json: "bonusStardustCaptureReward", js: "bonusStardustCaptureReward", typ: u(undefined, 0) },
        { json: "bonusXlCandyCaptureReward", js: "bonusXlCandyCaptureReward", typ: u(undefined, 0) },
    ], false),
    "EvolutionBranch": o([
        { json: "evolution", js: "evolution", typ: u(undefined, "") },
        { json: "candyCost", js: "candyCost", typ: u(undefined, 0) },
        { json: "form", js: "form", typ: u(undefined, "") },
        { json: "obPurificationEvolutionCandyCost", js: "obPurificationEvolutionCandyCost", typ: u(undefined, 0) },
        { json: "temporaryEvolution", js: "temporaryEvolution", typ: u(undefined, r("Temp")) },
        { json: "temporaryEvolutionEnergyCost", js: "temporaryEvolutionEnergyCost", typ: u(undefined, 0) },
        { json: "temporaryEvolutionEnergyCostSubsequent", js: "temporaryEvolutionEnergyCostSubsequent", typ: u(undefined, 0) },
        { json: "evolutionItemRequirement", js: "evolutionItemRequirement", typ: u(undefined, "") },
        { json: "noCandyCostViaTrade", js: "noCandyCostViaTrade", typ: u(undefined, true) },
        { json: "priority", js: "priority", typ: u(undefined, 0) },
        { json: "questDisplay", js: "questDisplay", typ: u(undefined, a(r("QuestDisplay"))) },
        { json: "lureItemRequirement", js: "lureItemRequirement", typ: u(undefined, "") },
        { json: "kmBuddyDistanceRequirement", js: "kmBuddyDistanceRequirement", typ: u(undefined, 3.14) },
        { json: "mustBeBuddy", js: "mustBeBuddy", typ: u(undefined, true) },
        { json: "onlyDaytime", js: "onlyDaytime", typ: u(undefined, true) },
        { json: "onlyNighttime", js: "onlyNighttime", typ: u(undefined, true) },
        { json: "obEvolutionBranchBool2", js: "obEvolutionBranchBool2", typ: u(undefined, true) },
        { json: "genderRequirement", js: "genderRequirement", typ: u(undefined, r("GenderRequirementEnum")) },
        { json: "onlyUpsideDown", js: "onlyUpsideDown", typ: u(undefined, true) },
        { json: "obEvolutionStoneAItemCost", js: "obEvolutionStoneAItemCost", typ: u(undefined, 0) },
    ], false),
    "QuestDisplay": o([
        { json: "questRequirementTemplateId", js: "questRequirementTemplateId", typ: "" },
    ], false),
    "FormChange": o([
        { json: "availableForm", js: "availableForm", typ: a("") },
        { json: "candyCost", js: "candyCost", typ: u(undefined, 0) },
        { json: "stardustCost", js: "stardustCost", typ: u(undefined, 0) },
        { json: "item", js: "item", typ: u(undefined, "") },
    ], false),
    "Shadow": o([
        { json: "purificationStardustNeeded", js: "purificationStardustNeeded", typ: 0 },
        { json: "purificationCandyNeeded", js: "purificationCandyNeeded", typ: 0 },
        { json: "purifiedChargeMove", js: "purifiedChargeMove", typ: r("PurifiedChargeMove") },
        { json: "shadowChargeMove", js: "shadowChargeMove", typ: r("ShadowChargeMove") },
    ], false),
    "Stats": o([
        { json: "baseStamina", js: "baseStamina", typ: u(undefined, 0) },
        { json: "baseAttack", js: "baseAttack", typ: u(undefined, 0) },
        { json: "baseDefense", js: "baseDefense", typ: u(undefined, 0) },
    ], false),
    "TempEvoOverride": o([
        { json: "tempEvoId", js: "tempEvoId", typ: u(undefined, r("Temp")) },
        { json: "stats", js: "stats", typ: u(undefined, r("Stats")) },
        { json: "averageHeightM", js: "averageHeightM", typ: u(undefined, 3.14) },
        { json: "averageWeightKg", js: "averageWeightKg", typ: u(undefined, 3.14) },
        { json: "typeOverride1", js: "typeOverride1", typ: u(undefined, r("TypeElement")) },
        { json: "typeOverride2", js: "typeOverride2", typ: u(undefined, r("TypeElement")) },
        { json: "camera", js: "camera", typ: u(undefined, r("TempEvoOverrideCamera")) },
        { json: "modelScaleV2", js: "modelScaleV2", typ: u(undefined, 3.14) },
        { json: "modelHeight", js: "modelHeight", typ: u(undefined, 3.14) },
        { json: "buddyOffsetMale", js: "buddyOffsetMale", typ: u(undefined, a(3.14)) },
        { json: "buddyOffsetFemale", js: "buddyOffsetFemale", typ: u(undefined, a(3.14)) },
        { json: "buddyPortraitOffset", js: "buddyPortraitOffset", typ: u(undefined, a(3.14)) },
        { json: "raidBossDistanceOffset", js: "raidBossDistanceOffset", typ: u(undefined, 3.14) },
        { json: "obTempEvoOverrideFloat1", js: "obTempEvoOverrideFloat1", typ: u(undefined, a(3.14)) },
    ], false),
    "TempEvoOverrideCamera": o([
        { json: "cylinderRadiusM", js: "cylinderRadiusM", typ: u(undefined, 3.14) },
        { json: "cylinderHeightM", js: "cylinderHeightM", typ: 3.14 },
        { json: "cylinderGroundM", js: "cylinderGroundM", typ: u(undefined, 3.14) },
    ], false),
    "ThirdMove": o([
        { json: "stardustToUnlock", js: "stardustToUnlock", typ: u(undefined, 0) },
        { json: "candyToUnlock", js: "candyToUnlock", typ: 0 },
    ], false),
    "PokemonTagSettings": o([
        { json: "minPlayerLevelForPokemonTagging", js: "minPlayerLevelForPokemonTagging", typ: 0 },
        { json: "colorBinding", js: "colorBinding", typ: a(r("ColorBinding")) },
        { json: "maxNumTagsAllowed", js: "maxNumTagsAllowed", typ: 0 },
    ], false),
    "ColorBinding": o([
        { json: "color", js: "color", typ: "" },
        { json: "hexCode", js: "hexCode", typ: "" },
    ], false),
    "PokemonUpgrades": o([
        { json: "upgradesPerLevel", js: "upgradesPerLevel", typ: 0 },
        { json: "allowedLevelsAbovePlayer", js: "allowedLevelsAbovePlayer", typ: 0 },
        { json: "candyCost", js: "candyCost", typ: a(0) },
        { json: "stardustCost", js: "stardustCost", typ: a(0) },
        { json: "shadowStardustMultiplier", js: "shadowStardustMultiplier", typ: 3.14 },
        { json: "shadowCandyMultiplier", js: "shadowCandyMultiplier", typ: 3.14 },
        { json: "purifiedStardustMultiplier", js: "purifiedStardustMultiplier", typ: 3.14 },
        { json: "purifiedCandyMultiplier", js: "purifiedCandyMultiplier", typ: 3.14 },
        { json: "maxNormalUpgradeLevel", js: "maxNormalUpgradeLevel", typ: 0 },
        { json: "defaultCpBoostAdditionalLevel", js: "defaultCpBoostAdditionalLevel", typ: 0 },
        { json: "xlCandyMinPlayerLevel", js: "xlCandyMinPlayerLevel", typ: 0 },
        { json: "xlCandyCost", js: "xlCandyCost", typ: a(0) },
        { json: "obMaxMegaLevel", js: "obMaxMegaLevel", typ: 0 },
    ], false),
    "PokestopInvasionAvailabilitySettings": o([
        { json: "availabilityStartMinute", js: "availabilityStartMinute", typ: 0 },
        { json: "availabilityEndMinute", js: "availabilityEndMinute", typ: 0 },
    ], false),
    "QuestEvolutionSettings": o([
        { json: "enableQuestEvolutions", js: "enableQuestEvolutions", typ: true },
        { json: "enableWalkingQuestEvolutions", js: "enableWalkingQuestEvolutions", typ: true },
    ], false),
    "QuestSettings": o([
        { json: "questType", js: "questType", typ: "" },
        { json: "dailyQuest", js: "dailyQuest", typ: r("DailyQuest") },
    ], false),
    "DailyQuest": o([
        { json: "bucketsPerDay", js: "bucketsPerDay", typ: 0 },
        { json: "streakLength", js: "streakLength", typ: 0 },
        { json: "bonusMultiplier", js: "bonusMultiplier", typ: u(undefined, 3.14) },
        { json: "streakBonusMultiplier", js: "streakBonusMultiplier", typ: u(undefined, 3.14) },
    ], false),
    "RAIDSettings": o([
        { json: "remoteRaidEnabled", js: "remoteRaidEnabled", typ: true },
        { json: "maxRemoteRaidPasses", js: "maxRemoteRaidPasses", typ: 0 },
        { json: "remoteDamageModifier", js: "remoteDamageModifier", typ: 3.14 },
        { json: "remoteRaidsMinPlayerLevel", js: "remoteRaidsMinPlayerLevel", typ: 0 },
        { json: "maxNumFriendInvites", js: "maxNumFriendInvites", typ: 0 },
        { json: "friendInviteCutoffTimeSec", js: "friendInviteCutoffTimeSec", typ: 0 },
        { json: "canInviteFriendsInPerson", js: "canInviteFriendsInPerson", typ: true },
        { json: "canInviteFriendsRemotely", js: "canInviteFriendsRemotely", typ: true },
        { json: "maxPlayersPerLobby", js: "maxPlayersPerLobby", typ: 0 },
        { json: "maxRemotePlayersPerLobby", js: "maxRemotePlayersPerLobby", typ: 0 },
        { json: "inviteCooldownDurationMillis", js: "inviteCooldownDurationMillis", typ: "" },
        { json: "maxNumFriendInvitesPerAction", js: "maxNumFriendInvitesPerAction", typ: 0 },
        { json: "unsupportedRaidLevelsForFriendInvites", js: "unsupportedRaidLevelsForFriendInvites", typ: a("") },
        { json: "unsupportedRemoteRaidLevels", js: "unsupportedRemoteRaidLevels", typ: a("") },
        { json: "obRaidClientSetting", js: "obRaidClientSetting", typ: a(r("ObRAIDClientSetting")) },
        { json: "obRaidClientSetting2", js: "obRaidClientSetting2", typ: r("ObRAIDClientSetting2") },
        { json: "obBootRaidStateEnabled", js: "obBootRaidStateEnabled", typ: true },
        { json: "obRaidClientSettingsBool2", js: "obRaidClientSettingsBool2", typ: true },
        { json: "obRemotePassGpsExploitBlockingEnabled", js: "obRemotePassGpsExploitBlockingEnabled", typ: true },
        { json: "obRaidClientSettingsNumber1", js: "obRaidClientSettingsNumber1", typ: 0 },
        { json: "obDisplayRemoteRaidPassRemainingText", js: "obDisplayRemoteRaidPassRemainingText", typ: true },
        { json: "obRaidClientSettingsNumber2", js: "obRaidClientSettingsNumber2", typ: 0 },
        { json: "obRaidClientSettingsNumber3", js: "obRaidClientSettingsNumber3", typ: 0 },
    ], false),
    "ObRAIDClientSetting": o([
        { json: "raidLevel", js: "raidLevel", typ: "" },
        { json: "obRaidClientSettingString1", js: "obRaidClientSettingString1", typ: "" },
    ], false),
    "ObRAIDClientSetting2": o([
        { json: "obRaidClientSettings2Bool1", js: "obRaidClientSettings2Bool1", typ: true },
    ], false),
    "RecomendedSearchSettings": o([
        { json: "searchLabel", js: "searchLabel", typ: "" },
        { json: "appendSearchString", js: "appendSearchString", typ: u(undefined, "") },
        { json: "searchKey", js: "searchKey", typ: u(undefined, "") },
    ], false),
    "ReferralSettings": o([
        { json: "featureEnabled", js: "featureEnabled", typ: true },
        { json: "recentFeatures", js: "recentFeatures", typ: a(r("RecentFeature")) },
        { json: "addReferrerGracePeriodMs", js: "addReferrerGracePeriodMs", typ: "" },
        { json: "minNumDaysWithoutSessionForLapsedPlayer", js: "minNumDaysWithoutSessionForLapsedPlayer", typ: 0 },
        { json: "obDeepLinkUrl", js: "obDeepLinkUrl", typ: "" },
        { json: "obReferralSettingsBool1", js: "obReferralSettingsBool1", typ: true },
    ], false),
    "RecentFeature": o([
        { json: "iconType", js: "iconType", typ: "" },
        { json: "featureName", js: "featureName", typ: "" },
        { json: "description", js: "description", typ: "" },
    ], false),
    "RouteCreationSettings": o([
        { json: "maxOpenRoutes", js: "maxOpenRoutes", typ: 0 },
        { json: "minTotalDistanceM", js: "minTotalDistanceM", typ: 3.14 },
        { json: "maxTotalDistanceM", js: "maxTotalDistanceM", typ: 3.14 },
        { json: "maxNameLength", js: "maxNameLength", typ: 0 },
        { json: "maxDescriptionLength", js: "maxDescriptionLength", typ: 0 },
        { json: "minPlayerLevel", js: "minPlayerLevel", typ: 0 },
        { json: "enabled", js: "enabled", typ: true },
        { json: "obRoutesCreationSettingsBool1", js: "obRoutesCreationSettingsBool1", typ: true },
        { json: "obRoutesCreationSettingsNumber5", js: "obRoutesCreationSettingsNumber5", typ: 0 },
        { json: "obRoutesCreationSettingsNumber6", js: "obRoutesCreationSettingsNumber6", typ: 0 },
        { json: "obRoutesCreationSettingsNumber7", js: "obRoutesCreationSettingsNumber7", typ: 0 },
        { json: "obRoutesCreationSettingsFloat3", js: "obRoutesCreationSettingsFloat3", typ: 3.14 },
        { json: "obRoutesCreationSettingsNumber9", js: "obRoutesCreationSettingsNumber9", typ: 0 },
        { json: "obRoutesCreationSettingsNumber10", js: "obRoutesCreationSettingsNumber10", typ: 0 },
        { json: "obRoutesCreationSettingsBool2", js: "obRoutesCreationSettingsBool2", typ: true },
        { json: "obRoutesCreationSettingsMessage1", js: "obRoutesCreationSettingsMessage1", typ: r("ObRoutesCreationSettingsMessage1") },
    ], false),
    "ObRoutesCreationSettingsMessage1": o([
        { json: "obRouteGameMasterMessage1", js: "obRouteGameMasterMessage1", typ: 3.14 },
        { json: "obRouteGameMasterMessage2", js: "obRouteGameMasterMessage2", typ: 3.14 },
        { json: "obRouteGameMasterMessage3", js: "obRouteGameMasterMessage3", typ: 3.14 },
    ], false),
    "RouteDiscoverySettings": o([
        { json: "nearbyVisibleRadiusMeters", js: "nearbyVisibleRadiusMeters", typ: 3.14 },
    ], false),
    "RoutePlaySettings": o([
        { json: "minPlayerLevel", js: "minPlayerLevel", typ: 0 },
        { json: "routeExpirationMinutes", js: "routeExpirationMinutes", typ: 0 },
        { json: "routePauseDistanceM", js: "routePauseDistanceM", typ: 0 },
    ], false),
    "SmeargleMovesSettings": o([
        { json: "quickMoves", js: "quickMoves", typ: a("") },
        { json: "cinematicMoves", js: "cinematicMoves", typ: a("") },
    ], false),
    "SponsoredGeofenceGiftSettings": o([
        { json: "giftPersistenceTimeMs", js: "giftPersistenceTimeMs", typ: 0 },
        { json: "mapPresentationTimeMs", js: "mapPresentationTimeMs", typ: 0 },
        { json: "enableSponsoredGeofenceGift", js: "enableSponsoredGeofenceGift", typ: true },
        { json: "fullscreenDisableExitButtonTimeMs", js: "fullscreenDisableExitButtonTimeMs", typ: 0 },
        { json: "balloonGiftSettings", js: "balloonGiftSettings", typ: r("BalloonGiftSettings") },
        { json: "obSponsoredGeofenceGiftSettingsBool1", js: "obSponsoredGeofenceGiftSettingsBool1", typ: true },
        { json: "obSponsoredGeofenceGiftSettingsNumber1", js: "obSponsoredGeofenceGiftSettingsNumber1", typ: 0 },
        { json: "obSponsoredGeofenceGiftSettingsBool2", js: "obSponsoredGeofenceGiftSettingsBool2", typ: true },
        { json: "obVideoAdDetails", js: "obVideoAdDetails", typ: r("ObVideoAdDetails") },
    ], false),
    "BalloonGiftSettings": o([
        { json: "enableBalloonGift", js: "enableBalloonGift", typ: true },
        { json: "balloonAutoDismissTimeMs", js: "balloonAutoDismissTimeMs", typ: 0 },
        { json: "getWasabiAdRpcIntervalMs", js: "getWasabiAdRpcIntervalMs", typ: 0 },
        { json: "obIsVideoAd", js: "obIsVideoAd", typ: true },
    ], false),
    "ObVideoAdDetails": o([
        { json: "obVideoAdDetailsString1", js: "obVideoAdDetailsString1", typ: "" },
        { json: "obVideoAdDetailsString2", js: "obVideoAdDetailsString2", typ: "" },
        { json: "obVideoAdDetailsString3", js: "obVideoAdDetailsString3", typ: "" },
    ], false),
    "StickerMetadata": o([
        { json: "stickerId", js: "stickerId", typ: "" },
        { json: "maxCount", js: "maxCount", typ: 0 },
        { json: "pokemonId", js: "pokemonId", typ: u(undefined, "") },
        { json: "obStickerCategory", js: "obStickerCategory", typ: a(r("ObStickerCategoryEnum")) },
        { json: "obStickerDate", js: "obStickerDate", typ: 0 },
        { json: "obStickerSortOrder", js: "obStickerSortOrder", typ: u(undefined, 0) },
        { json: "stickerUrl", js: "stickerUrl", typ: u(undefined, "") },
    ], false),
    "TappableSettings": o([
        { json: "visibleRadiusMeters", js: "visibleRadiusMeters", typ: 3.14 },
        { json: "spawnAngleDegrees", js: "spawnAngleDegrees", typ: 3.14 },
        { json: "movementRespawnThresholdMeters", js: "movementRespawnThresholdMeters", typ: 3.14 },
        { json: "buddyFovDegress", js: "buddyFovDegress", typ: 3.14 },
        { json: "avgTappablesInView", js: "avgTappablesInView", typ: 3.14 },
    ], false),
    "TemporaryEvolutionSettings": o([
        { json: "pokemonId", js: "pokemonId", typ: "" },
        { json: "temporaryEvolutions", js: "temporaryEvolutions", typ: a(r("TemporaryEvolution")) },
    ], false),
    "TemporaryEvolution": o([
        { json: "temporaryEvolutionId", js: "temporaryEvolutionId", typ: r("Temp") },
        { json: "assetBundleValue", js: "assetBundleValue", typ: 0 },
    ], false),
    "TypeEffective": o([
        { json: "attackScalar", js: "attackScalar", typ: a(3.14) },
        { json: "attackType", js: "attackType", typ: r("TypeElement") },
    ], false),
    "VsSeekerClientSettings": o([
        { json: "allowedVsSeekerLeagueTemplateId", js: "allowedVsSeekerLeagueTemplateId", typ: a("") },
    ], false),
    "VsSeekerLoot": o([
        { json: "rankLevel", js: "rankLevel", typ: 0 },
        { json: "reward", js: "reward", typ: a(r("Reward")) },
        { json: "rewardTrack", js: "rewardTrack", typ: u(undefined, r("RewardTrack")) },
    ], false),
    "Reward": o([
        { json: "item", js: "item", typ: u(undefined, r("ItemClass")) },
        { json: "itemRankingLootTableCount", js: "itemRankingLootTableCount", typ: u(undefined, 0) },
        { json: "pokemonReward", js: "pokemonReward", typ: u(undefined, true) },
    ], false),
    "ItemClass": o([
        { json: "stardust", js: "stardust", typ: u(undefined, true) },
        { json: "count", js: "count", typ: 0 },
        { json: "item", js: "item", typ: u(undefined, r("ItemEnum")) },
    ], false),
    "VsSeekerPokemonRewards": o([
        { json: "availablePokemon", js: "availablePokemon", typ: a(r("VsSeekerPokemonRewardsAvailablePokemon")) },
        { json: "rewardTrack", js: "rewardTrack", typ: u(undefined, r("RewardTrack")) },
    ], false),
    "VsSeekerPokemonRewardsAvailablePokemon": o([
        { json: "guaranteedLimitedPokemonReward", js: "guaranteedLimitedPokemonReward", typ: u(undefined, r("GuaranteedLimitedPokemonReward")) },
        { json: "unlockedAtRank", js: "unlockedAtRank", typ: 0 },
        { json: "attackIvOverride", js: "attackIvOverride", typ: r("IvOverride") },
        { json: "defenseIvOverride", js: "defenseIvOverride", typ: r("IvOverride") },
        { json: "staminaIvOverride", js: "staminaIvOverride", typ: r("IvOverride") },
        { json: "pokemon", js: "pokemon", typ: u(undefined, r("GuaranteedLimitedPokemonRewardPokemon")) },
    ], false),
    "IvOverride": o([
        { json: "range", js: "range", typ: r("Range") },
    ], false),
    "Range": o([
        { json: "min", js: "min", typ: 0 },
        { json: "max", js: "max", typ: 0 },
    ], false),
    "GuaranteedLimitedPokemonReward": o([
        { json: "pokemon", js: "pokemon", typ: r("GuaranteedLimitedPokemonRewardPokemon") },
        { json: "identifier", js: "identifier", typ: "" },
        { json: "perCompetitiveCombatSeasonMaxCount", js: "perCompetitiveCombatSeasonMaxCount", typ: u(undefined, 0) },
        { json: "lifetimeMaxCount", js: "lifetimeMaxCount", typ: u(undefined, 0) },
    ], false),
    "GuaranteedLimitedPokemonRewardPokemon": o([
        { json: "pokemonId", js: "pokemonId", typ: "" },
        { json: "pokemonDisplay", js: "pokemonDisplay", typ: u(undefined, r("PokemonDisplay")) },
    ], false),
    "WeatherAffinities": o([
        { json: "weatherCondition", js: "weatherCondition", typ: "" },
        { json: "pokemonType", js: "pokemonType", typ: a(r("TypeElement")) },
    ], false),
    "WeatherBonusSettings": o([
        { json: "cpBaseLevelBonus", js: "cpBaseLevelBonus", typ: 0 },
        { json: "guaranteedIndividualValues", js: "guaranteedIndividualValues", typ: 0 },
        { json: "stardustBonusMultiplier", js: "stardustBonusMultiplier", typ: 3.14 },
        { json: "attackBonusMultiplier", js: "attackBonusMultiplier", typ: 3.14 },
        { json: "raidEncounterCpBaseLevelBonus", js: "raidEncounterCpBaseLevelBonus", typ: 0 },
        { json: "raidEncounterGuaranteedIndividualValues", js: "raidEncounterGuaranteedIndividualValues", typ: 0 },
    ], false),
    "AvatarType": [
        "PLAYER_AVATAR_FEMALE",
    ],
    "Name": [
        "group_backpack",
        "group_belt",
        "group_eyes",
        "group_face",
        "group_glasses",
        "group_gloves",
        "group_hair",
        "group_halloween",
        "group_hat",
        "group_necklace",
        "group_outfits",
        "group_pants",
        "group_poses",
        "group_seasonal",
        "group_shirt",
        "group_shoes",
        "group_skin",
        "group_socks",
        "group_sponsor",
        "group_uniqlo",
    ],
    "Slot": [
        "BACKPACK",
        "BELT",
        "EYES",
        "FACE",
        "GLASSES",
        "GLOVES",
        "HAIR",
        "HAT",
        "NECKLACE",
        "PANTS",
        "POSE",
        "SHIRT",
        "SHOES",
        "SKIN",
        "SOCKS",
    ],
    "UnlockType": [
        "DEFAULT",
        "IAP_CLOTHING",
        "LEVEL_REWARD",
    ],
    "Interpolation": [
        "CAM_INTERP_CUT",
        "CAM_INTERP_LINEAR",
    ],
    "TargetType": [
        "CAM_TARGET_ATTACKER",
        "CAM_TARGET_ATTACKER_DEFENDER",
        "CAM_TARGET_ATTACKER_DEFENDER_EDGE",
        "CAM_TARGET_ATTACKER_DEFENDER_MIRROR",
        "CAM_TARGET_ATTACKER_DEFENDER_WORLD",
        "CAM_TARGET_ATTACKER_EDGE",
        "CAM_TARGET_ATTACKER_GROUND",
        "CAM_TARGET_DEFENDER",
        "CAM_TARGET_DEFENDER_ATTACKER",
        "CAM_TARGET_DEFENDER_ATTACKER_EDGE",
        "CAM_TARGET_DEFENDER_EDGE",
        "CAM_TARGET_DEFENDER_GROUND",
        "CAM_TARGET_SHOULDER_ATTACKER_DEFENDER",
        "CAM_TARGET_SHOULDER_ATTACKER_DEFENDER_MIRROR",
    ],
    "BadgeType": [
        "BADGE_GREAT_LEAGUE",
        "BADGE_MASTER_LEAGUE",
        "BADGE_ULTRA_LEAGUE",
    ],
    "CombatLeagueTemplateID": [
        "COMBAT_LEAGUE_DEFAULT_GREAT",
        "COMBAT_LEAGUE_DEFAULT_MASTER",
        "COMBAT_LEAGUE_DEFAULT_ULTRA",
        "COMBAT_LEAGUE_VS_SEEKER_GREAT",
    ],
    "LeagueType": [
        "PREMIER",
        "STANDARD",
    ],
    "ObCombatRefactorToggle": [
        "CLIENT_COMBAT_NULL_RPC_GUARD",
        "CLIENT_FAST_MOVE_FLY_IN_CLIP_FALL_BACK",
        "CLIENT_REOBSERVER_COMBAT_STATE",
        "CLIENT_SWAP_WIDGET_DISMISS",
        "COMBAT_REWARDS_INVOKE",
        "DEFENSIVE_ACK_CHECK",
        "DOWNSTREAM_REDUNDANCY",
        "FAST_MOVE_ALWAYS_LEAK",
        "FAST_MOVE_FLY_IN_CLIP",
        "MINIGAME_FAST_MOVE_CLEAR",
        "SERVER_FLY_IN_FLY_OUT",
        "SWAP_DELAY_TY_GREIL",
        "SWAP_FAST_MOVE_CLEAR",
    ],
    "PokemonConditionType": [
        "POKEMON_BANLIST",
        "POKEMON_CAUGHT_TIMESTAMP",
        "POKEMON_LEVEL_RANGE",
        "POKEMON_WHITELIST",
        "WITH_POKEMON_CP_LIMIT",
        "WITH_POKEMON_TYPE",
        "WITH_UNIQUE_POKEMON",
    ],
    "TypeElement": [
        "POKEMON_TYPE_BUG",
        "POKEMON_TYPE_DARK",
        "POKEMON_TYPE_DRAGON",
        "POKEMON_TYPE_ELECTRIC",
        "POKEMON_TYPE_FAIRY",
        "POKEMON_TYPE_FIGHTING",
        "POKEMON_TYPE_FIRE",
        "POKEMON_TYPE_FLYING",
        "POKEMON_TYPE_GHOST",
        "POKEMON_TYPE_GRASS",
        "POKEMON_TYPE_GROUND",
        "POKEMON_TYPE_ICE",
        "POKEMON_TYPE_NORMAL",
        "POKEMON_TYPE_POISON",
        "POKEMON_TYPE_PSYCHIC",
        "POKEMON_TYPE_ROCK",
        "POKEMON_TYPE_STEEL",
        "POKEMON_TYPE_WATER",
    ],
    "BackdropImageBundle": [
        "combat_blanche_backdrop",
        "combat_candela_backdrop",
        "combat_spark_backdrop",
    ],
    "Context": [
        "EVOLUTION_QUEST",
    ],
    "Category": [
        "IAP_CATEGORY_BUNDLE",
        "IAP_CATEGORY_FREE",
        "IAP_CATEGORY_GLOBAL_EVENT_TICKET",
        "IAP_CATEGORY_ITEMS",
        "IAP_CATEGORY_STICKER",
        "IAP_CATEGORY_TRANSPORTER_ENERGY",
        "IAP_CATEGORY_UPGRADES",
    ],
    "AvatarEyes": [
        "AVATAR_f_eyes_1",
        "AVATAR_f_eyes_3",
        "AVATAR_m_eyes_3",
    ],
    "AvatarFace": [
        "AVATAR_f_face_empty",
        "AVATAR_m_face_empty",
    ],
    "ObCombatMusic": [
        "CombatMusic",
        "GoTour2022Music02",
    ],
    "ObPartySelectionMusic": [
        "CombatLeaguePickerMusic",
        "QuestMusic",
    ],
    "GenderRequirementEnum": [
        "FEMALE",
        "GENDERLESS",
        "MALE",
    ],
    "ObPokedexHeader": [
        "alola_pokedex_header",
        "galarian_pokedex_header",
        "gender_female",
        "gender_male",
        "hisuian_pokedex_header",
    ],
    "Temp": [
        "TEMP_EVOLUTION_MEGA",
        "TEMP_EVOLUTION_MEGA_X",
        "TEMP_EVOLUTION_MEGA_Y",
        "TEMP_EVOLUTION_PRIMAL",
    ],
    "PokemonClass": [
        "POKEMON_CLASS_LEGENDARY",
        "POKEMON_CLASS_MYTHIC",
        "POKEMON_CLASS_ULTRA_BEAST",
    ],
    "BuddySize": [
        "BUDDY_BABY",
        "BUDDY_BIG",
        "BUDDY_FLYING",
        "BUDDY_SHOULDER",
    ],
    "MovementType": [
        "MOVEMENT_ELECTRIC",
        "MOVEMENT_FLYING",
        "MOVEMENT_HOVERING",
        "MOVEMENT_JUMP",
        "MOVEMENT_PSYCHIC",
    ],
    "PurifiedChargeMove": [
        "AEROBLAST_PLUS_PLUS",
        "RETURN",
        "SACRED_FIRE_PLUS_PLUS",
    ],
    "ShadowChargeMove": [
        "AEROBLAST_PLUS",
        "FRUSTRATION",
        "SACRED_FIRE_PLUS",
    ],
    "ObStickerCategoryEnum": [
        "Characters",
        "Messages",
        "Misc",
        "Pokemon",
        "24_7",
    ],
    "ItemEnum": [
        "ITEM_RARE_CANDY",
    ],
    "RewardTrack": [
        "PREMIUM",
    ],
};
