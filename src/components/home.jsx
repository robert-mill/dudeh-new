import React from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
const data = [
	{
		heading: '<h1>Dennis Francis Udeh (R.I.P.)</h1>',
		body:
			'<p>Programmer, Teacher and Friend.<br>11th March 1955 - 20th April 2022</p><p>This site has been disabled  for the moment.</p><p>For further dtails please contact me on </p><span style="width:100%; display:inline-block; background-color: rgba(255,255,255,0.8); padding:4px;"><a href="mailto:r.mill@ntlworld.com" target="_blank">Robert Mill</a></span>',
		image: '',
		caption: '<p>Dennis Udeh</p>'
	}
];
const Home = () => {
	return (
		<div className="row home-block">
			<div className="container">
				<div className="col-md-12 home-pan" id="group0">
					<div className="col-md-6 col-xs-12 h-100 hp-content">
						{data &&
							data.map((m) => (
								<div className="col table-block m-auto" key={m}>
									<div className="inner-table-block">
										<div className="inner-table-block-text">
											...
											{parse(m.heading)}
											{m.image &&
											this.handleImage(m) && (
												<div className="table-image-pan">
													<img src={m.image} alt={stripHtml(m.heading)} />
													{m.caption && <div className="table-caption">{m.caption}</div>}
												</div>
											)}
											{parse(m.body)}
										</div>
									</div>
								</div>
							))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
