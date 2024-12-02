import Bun from "bun";

const input = await Bun.file(
	`${import.meta.dir}/input${process.env.NODE_ENV === "dev" ? "-test" : ""}.txt`,
).text();

partOne();
partTwo();

function partOne() {
	const initialSeedRegex = /^seeds:\s((?:\d+[^\S])+)$/gim;
	const sourceToDestinationMapsRegex = /(?:^\n(?<source>\D+)-to-(?<destination>\D+)\smap:$)+/gim;
	const rangesRegex = /^(?<destinationRangeStart>\d+)\s(?<sourceRangeStart>\d+)\s(?<range>\d+)$/gim;

	console.time("partOne");

	const seedsMatch = initialSeedRegex.exec(input);
	const xToYMapsMatch = input.matchAll(sourceToDestinationMapsRegex);
	const xToYMapsArray = [...xToYMapsMatch];

	if (!seedsMatch) throw new Error("oops");

	const categoriesRanges = xToYMapsArray.map((match, index) => {
		const next = xToYMapsArray.at(index + 1);

		const currentRangesSubstring = input.slice(
			input.indexOf(match[0]),
			next ? input.indexOf(next[0]) : input.length,
		);

		const rangesMatches = currentRangesSubstring.matchAll(rangesRegex);

		const rangesGroups = [...rangesMatches]
			.map((rangesMatch) => rangesMatch.groups)
			.filter(Boolean);

		return rangesGroups;
	});

	let minLocation: number | null = null;

	const seeds = seedsMatch[1].replace("\n", "").split(" ");

	for (const seed of seeds) {
		let mappedValue = Number(seed);

		for (const categoryRanges of categoriesRanges) {
			let minRangeToMap: (typeof categoryRanges)[number] | null = null;

			for (const ranges of categoryRanges) {
				const { sourceRangeStart, range } = ranges;

				if (mappedValue < Number(sourceRangeStart)) continue;
				else if (mappedValue >= Number(sourceRangeStart) + Number(range)) continue;
				else if (
					minRangeToMap &&
					Number(minRangeToMap["sourceRangeStart"]) < Number(sourceRangeStart)
				) {
					continue;
				}

				minRangeToMap = ranges;
			}

			mappedValue = minRangeToMap
				? mappedValue -
				  (Number(minRangeToMap["sourceRangeStart"]) -
						Number(minRangeToMap["destinationRangeStart"]))
				: mappedValue;
		}

		if (minLocation && mappedValue >= minLocation) continue;

		minLocation = mappedValue;
	}

	console.log(minLocation);

	console.timeEnd("partOne");
}

function partTwo() {
	console.time("partTwo");

	const seedsRangeRegex = /\d+\s\d+/gi;
	const sourceToDestinationMapsRegex = /(?:^\n(?<source>\D+)-to-(?<destination>\D+)\smap:$)+/gim;
	const rangesRegex = /^(?<destinationRangeStart>\d+)\s(?<sourceRangeStart>\d+)\s(?<range>\d+)$/gim;

	const seedsRangeMatch = input.split("\n")[0].matchAll(seedsRangeRegex);
	const xToYMapsMatch = input.matchAll(sourceToDestinationMapsRegex);
	const xToYMapsArray = [...xToYMapsMatch];

	let seeds = [...seedsRangeMatch].map((seedRange) => {
		const [seed, range] = seedRange[0].split(" ");

		return { seed: Number(seed), range: Number(range) };
	});

	let minLocation: number | null = null;

	const categoriesRanges = xToYMapsArray.map((match, index) => {
		const next = xToYMapsArray.at(index + 1);

		const currentRangesSubstring = input.slice(
			input.indexOf(match[0]),
			next ? input.indexOf(next[0]) : input.length,
		);

		const rangesMatches = currentRangesSubstring.matchAll(rangesRegex);

		const rangesGroups = [...rangesMatches]
			.map((rangesMatch) => rangesMatch.groups)
			.filter(Boolean);

		return rangesGroups.map(({ destinationRangeStart, sourceRangeStart, range }) => {
			return {
				source: {
					start: Number(sourceRangeStart),
					end: Number(sourceRangeStart) + Number(range) - 1,
				},
				destination: {
					start: Number(destinationRangeStart),
					end: Number(destinationRangeStart) + Number(range) - 1,
				},
			};
		});
	});

	seeds.forEach((seedRange) => {
		const { seed, range } = seedRange;

		for (const categoryRanges of categoriesRanges) {
			const minRangeToMap = categoryRanges.find(({ source }) => {
				if (seed >= source.start && seed < source.end && seed + range - 1 > source.end) {
					const diff = seed + range - 1 - source.end;

					seeds.push({
						seed: source.end,
						range: diff,
					});

					seedRange.range -= diff;
				}

				return seed >= source.start && seed < source.end;
			});

			seedRange.seed = minRangeToMap
				? seed - (minRangeToMap.source.start - minRangeToMap.destination.start)
				: seed;

			console.log(seeds);
		}

		if (!minLocation || seed < minLocation) minLocation = seed;
	});

	console.log(minLocation);

	console.timeEnd("partTwo");
}
