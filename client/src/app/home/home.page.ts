import {
	Component,
	ElementRef,
	ViewChild,
	AfterViewInit,
	Renderer2,
	OnInit,
} from '@angular/core';
import { Papa, ParseResult } from 'ngx-papaparse';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
	@ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement> | null = null;
	// pgHeaders: any
	pgDataArray: any[] | null = null;
	pgDataMap: Map<string, PfGroup> | null = null;
	fileLoading: boolean = false;
	fileLoadingProgress = 0;
	fileLoaded: boolean = false;
	shadowIconUrl =
		'https://archives.bulbagarden.net/media/upload/e/e4/GO_Shadow_icon.png';
	purifiedIconUrl =
		'https://archives.bulbagarden.net/media/upload/8/89/GO_Purified_icon.png';
	constructor(private papa: Papa) {}

	handleImport() {
		this.fileLoading = true;
		this.papa.parse(this.fileInput?.nativeElement.files?.item(0) as File, {
			header: true,
			complete: (csv: ParseResult) => {
				// this.pgHeaders = csv.data[0]
				// this.pgData = csv.data.slice(1)
				// this.pgDataArray = csv.data
				// this.pgDataMap = this.condensePgData(csv.data);
				this.condensePgData(csv.data);
				this.fileLoading = false;
				this.fileLoaded = true;

				// console.log("pgHeaders:", this.pgHeaders)
				// console.log("pgData:", this.pgData)
			},
		});
	}
	condensePgData(data: PgDataRow[]) {
		this.pgDataMap = new Map<string, PfGroup>();
		data.forEach((pgRow, i) => {
			let pfId = pgRow.Form
				? `${pgRow['Pokemon Number']},${pgRow.Form}`
				: `${pgRow['Pokemon Number']}`;
			if (pfId) {
				let pfGroup: PfGroup | undefined = this.pgDataMap?.get(pfId);
				if (!pfGroup) {
					pfGroup = new PfGroup(
						pgRow['Pokemon Number'],
						pgRow.Name,
						pgRow.Form
					);
					this.pgDataMap?.set(pfId, pfGroup);
				}
				pfGroup.addEntry(pgRow);
				this.fileLoadingProgress = (i + 1) / data.length;
			}
		});
		console.log(this.pgDataMap);
		// return map;
	}

	ngOnInit() {
		// console.log(this.pgDataMap)
	}
	ngAfterViewInit() {
		console.log(this.fileInput);
	}
}

interface PgDataRow {
	Index: number;
	'Pokemon Number': number;
	Name: string;
	Form: string;
	Gender: string;
	CP: number;
	HP: number;
	'Atk IV': number;
	'Def IV': number;
	'Sta IV': number;
	'IV Avg': number;
	'Level Min': number;
	'Level Max': number;
	'Quick Move': string;
	'Charge Move': string;
	'Charge Move 2': string;
	'Catch Date': string;
	Lucky: 0 | 1;
	'Shadow/Purified': 0 | 1 | 2;
	Favorite: 0 | 1 | 2 | 3 | 4 | 5;
	Dust: number;
	'Rank % (G)': string;
	'Rank # (G)': number;
	'Stat Prod (G)': string;
	'Dust Cost (G)': number;
	'Candy Cost (G)': number;
	'Name (G)': string;
	'Form (G)': String;
	'Sha/Pur (G)': 0 | 1 | 2;
	'Rank % (U)': string;
	'Rank # (U)': number;
	'Stat Prod (U)': string;
	'Dust Cost (U)': number;
	'Candy Cost (U)': number;
	'Name (U)': string;
	'Form (U)': string;
	'Sha/Pur (U)': 0 | 1 | 2;
	'Marked for PvP use': string;
	[key: string]: any;
}

class LeagueSummary {
	league: 'G' | 'U' | 'M';
	cpLimit: number = 0;
	rankKey: string = '';
	spKey: string = '';
	eligible: number = 0;
	rankBest: number = 4096;
	rankWorst: number = 1;
	spMin: number = 100;
	spMax: number = 0;

	constructor(league: 'G' | 'U' | 'M') {
		this.league = league;
		if (league == 'G') {
			this.cpLimit = 1500;
			this.rankKey = 'Rank # (G)';
			this.spKey = 'Stat Prod (G)';
		}
		if (league == 'U') {
			this.cpLimit = 2500;
			this.rankKey = 'Rank # (U)';
			this.spKey = 'Stat Prod (U)';
		}
		// 	if (league == 'G') {
		// 		this.rankMin = this.rankMax = entry['Rank # (G)'];
		// 		this.spMin = this.spMax = +entry['Stat Prod (G)'].split('%')[0];
		// 	} else if (league == 'U') {
		// 		this.rankMin = this.rankMax = entry['Rank # (U)'];
		// 		this.spMin = this.spMax = +entry['Stat Prod (U)'].split('%')[0];
		// 	} else {
		// 		this.rankMin = this.rankMax = 0;
		// 		this.spMin = this.spMax = 0;
		// 	}
	}

	updateStats(pgRow: PgDataRow) {
		let rank: number = pgRow[this.rankKey];
		let sp: number = +pgRow[this.spKey]?.split('%')[0];
		if (rank < this.rankBest) {
			this.rankBest = rank;
			this.spMax = sp;
		} else if (rank > this.rankWorst) {
			this.rankWorst = rank;
			this.spMin = sp;
		}
		if (pgRow.CP <= this.cpLimit) this.eligible++;
		return this.rankBest;
	}
}

class PfGroup {
	number: number;
	pokemon: string;
	form: string;
	entries: PgDataRow[] = [];
	summary = {
		gl: new LeagueSummary('G'),
		ul: new LeagueSummary('U'),
		// ml: new LeagueSummary("M")
		bestRank: 4096,
		bestIdx: 0,
		bestLeague: '',
	};

	constructor(number: number, pokemon: string, form: string) {
		this.number = number;
		this.pokemon = pokemon;
		this.form = form;
	}

	addEntry(pgRow: PgDataRow) {
		this.entries.push(pgRow);
		let glBestRank = this.summary.gl.updateStats(pgRow);
		let ulBestRank = this.summary.ul.updateStats(pgRow);
		if (
			glBestRank < this.summary.bestRank ||
			ulBestRank < this.summary.bestRank
		)
			this.summary.bestIdx = this.entries.length - 1;
		if (glBestRank < ulBestRank) {
			this.summary.bestRank = glBestRank;
			this.summary.bestLeague = 'G';
		} else {
			this.summary.bestRank = ulBestRank;
			this.summary.bestLeague = 'U';
		}
	}
}
