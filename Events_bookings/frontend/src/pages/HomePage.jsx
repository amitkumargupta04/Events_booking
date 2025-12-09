import React from 'react';
import Header from '../components/home/Header';
import Hero from '../components/home/Hero';
import Speakers from '../components/home/Speakers';
import Pricing from '../components/home/Pricing';
import FAQ from '../components/home/FAQ';

export default function HomePage(){
	return (
		<div className="min-h-screen flex flex-col">
			<main className="flex-1">
				<Hero />
				<Speakers />
				<Pricing />
				<FAQ />
			</main>
		</div>
	);
}

