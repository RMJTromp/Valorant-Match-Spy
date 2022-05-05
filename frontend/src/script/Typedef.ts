// shared types
export type Product = "valorant" | "league_of_legends"
export type PresenceState = "away" | "dnd" | "chat" | "mobile"
export type CustomGameTeam = "TeamOne" | "TeamTwo" | "TeamSpectate"
export type GameMap =
	"/Game/Maps/Poveglia/Range" | // The Range
	"/Game/Maps/Triad/Triad" | // Haven
	"/Game/Maps/Bonsai/Bonsai" | // Split
	"/Game/Maps/Duality/Duality" | // Bind
	"/Game/Maps/Ascent/Ascent" | // Ascent
	"/Game/Maps/Port/Port" | // Icebox
	"/Game/Maps/Foxtrot/Foxtrot" | // Breeze
	"/Game/Maps/Canyon/Canyon" // Fracture
export type PartyAccessibility = "CLOSED" | "OPEN"
export type MatchTeam = "Red" | "Blue"
export type ProvisioningFlow = "Invalid" | "Matchmaking"
export type SessionLoopState = "MENUS" | "PREGAME" | "INGAME"
export type PartyState = "DEFAULT" | "MATCHMAKING" | "MATCHMADE_GAME_STARTING" | "CUSTOM_GAME_SETUP"
export type QueueID = "spikerush" | "competitive" | "unrated" | "deathmatch" | "onefa" | "ggteam"


// interfaces for local

export interface RawPresence {
	actor: string | null
	basic: string | null
	details: string | null
	game_name: string
	game_tag: string
	location: string | null
	msg: string | null
	name: string
	patchline: "live" | null
	pid: string
	platform: null
	private: string | null // base64 encoded JSON
	privateJwt: null
	product: Product
	puuid: string
	region: string
	resource: string
	state: PresenceState
	summary: string
	time: number
}

export interface Presence extends Omit<RawPresence, "private"> {
	private: PrivateData
}

export interface PrivateData {
	accountLevel: number
	competitiveTier: number
	customGameName: string
	customGameTeam: CustomGameTeam
	isIdle: boolean
	isPartyOwner: boolean
	isValid: boolean
	leaderboardPosition: number
	matchMap: GameMap
	maxPartySize: number
	partyAccessibility: PartyAccessibility
	partyClientVersion: string // "release-04.08-shipping-15-701907"
	partyId: string // uuid
	partyLFM: boolean
	partyOwnerMatchCurrentTeam: MatchTeam
	partyOwnerMatchMap: string
	partyOwnerMatchScoreAllyTeam: number
	partyOwnerMatchScoreEnemyTeam: number
	partyOwnerProvisioningFlow: ProvisioningFlow
	partyOwnerSessionLoopState: SessionLoopState
	partySize: number
	partyState: PartyState
	partyVersion: number
	playerCardId: string // uuid
	playerTitleId: string // uuid
	preferredLevelBorderId: string
	provisioningFlow: ProvisioningFlow
	queueEntryTime: string // "2022.05.03-23.08.47"
	queueId: QueueID
	rosterId: string
	sessionLoopState: SessionLoopState
	tournamentId: string
}

// interfaces for GLZ and PD

export interface PlayerData {
	Subject: string, // uuid
	MatchID: string, // uuid
	Version: number,
}

export interface PlayerIdentity {
	Subject: string, // uuid
	PlayerCardID: string, // uuid
	PlayerTitleID: string, // uuid
	AccountLevel: number,
	PreferredLevelBorderID: string, // uuid - no preference is "00000000-0000-0000-0000-000000000000"
	Incognito: boolean,
	HideAccountLevel: boolean
}

export interface SeasonalBadgeInfo {
	SeasonID: string, // uuid
	NumberOfWins: number,
	WinsByTier: {},
	Rank: number,
	LeaderboardRank: number
}

export interface PreGamePlayer {
	Subject: string, // uuid
	CharacterID: string | "",
	CharacterSelectionState: "",
	PregamePlayerState: "joined",
	CompetitiveTier: number,
	PlayerIdentity: PlayerIdentity,
	SeasonalBadgeInfo: SeasonalBadgeInfo,
	IsCaptain: boolean
}

export interface PreGameMatch {
	ID: string, // uuid
	Version: number,
	Teams: [
		{
			TeamID: MatchTeam,
			Players: PreGamePlayer[]
		}
	],
	AllyTeam: {
		TeamID: MatchTeam,
		Players: PreGamePlayer[]
	},
	EnemyTeam: null,
	ObserverSubjects: [],
	MatchCoaches: [],
	EnemyTeamSize: 5,
	EnemyTeamLockCount: 0,
	PregameState: "character_select_active",
	LastUpdated: string, // "0001-01-01T00:00:00Z"
	MapID: GameMap,
	MapSelectPool: [],
	BannedMapIDs: [],
	CastedVotes: {},
	MapSelectSteps: [],
	MapSelectStep: 0,
	Team1: MatchTeam,
	GamePodID: string, // "aresriot.aws-rclusterprod-euc1-1.eu-gp-frankfurt-1",
	Mode: string, // "/Game/GameModes/Bomb/BombGameMode.BombGameMode_C",
	VoiceSessionID: string, // "dc45c3c5-a6d1-4da4-8c88-30f4a094328d-tm1",
	MUCName: string, // "dc45c3c5-a6d1-4da4-8c88-30f4a094328d-1@ares-pregame.eu2.pvp.net",
	QueueID: QueueID,
	ProvisioningFlowID: ProvisioningFlow,
	IsRanked: boolean,
	PhaseTimeRemainingNS: number,
	StepTimeRemainingNS: number,
	altModesFlagADA: boolean,
	TournamentMetadata: null
}

export interface CoreGamePlayer {
	Subject: string, // uuid
	TeamID: MatchTeam,
	CharacterID: string, // uuid
	PlayerIdentity: PlayerIdentity,
	SeasonalBadgeInfo: SeasonalBadgeInfo,
	IsCoach: false,
	IsAssociated: true
}

export interface CoreGameMatch {
	MatchID: string, // uuid
	Version: number,
	State: "IN_PROGRESS",
	MapID: GameMap,
	ModeID: string, // "/Game/GameModes/Bomb/BombGameMode.BombGameMode_C",
	ProvisioningFlow: ProvisioningFlow,
	GamePodID: string, // "aresriot.aws-rclusterprod-euc1-1.eu-gp-frankfurt-1"
	AllMUCName: string, // "dc45c3c5-a6d1-4da4-8c88-30f4a094328d-all@ares-coregame.eu2.pvp.net"
	TeamMUCName: string, // "dc45c3c5-a6d1-4da4-8c88-30f4a094328d-blue@ares-coregame.eu2.pvp.net"
	TeamVoiceID: string, // "dc45c3c5-a6d1-4da4-8c88-30f4a094328d-tm1"
	IsReconnectable: boolean,
	ConnectionDetails: {
		GameServerHosts: string[],
		GameServerHost: string, // "75.2.31.169"
		GameServerPort: number,
		GameServerObfuscatedIP: number,
		GameClientHash: number,
		PlayerKey: string, // "qvSFqg8fG3HCdnsKuCWfW4bgA7kyZ8CSh4bWhosa8yrn3hms2PcAA0oSfb9wERlIbmSCmORfWyuC4wrVCsr2cg=="
	},
	PostGameDetails: null,
	Players: CoreGamePlayer[],
	MatchmakingData: {
		QueueID: QueueID,
		IsRanked: true
	}
}