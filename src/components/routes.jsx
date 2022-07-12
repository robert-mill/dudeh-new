import React from 'react';
import { BrowserRouter as Router, Routes as MainRoutes, Route, Navigate } from 'react-router-dom';
import NavBar from '../components/common/navBar';
//import HomeGroupForm from "./homeGroupForm";
import Home from './home';
// import HomeForm from "./homeForm";
// import About from "./about";
// import AboutGroupForm from "./aboutGroupForm";
// import AboutGalleryForm from "./aboutGalleryForm";
// import AboutForm from "./aboutForm";
// import ActorGalleryForm from "./actorGalleryForm";
// import Actor from "./actors";

// import BgForm from "./background-images";

// import Diving from "./diving";
// import DivingForm from "./divingForm";
// import DivingGalleryForm from "./divingGalleryForm";
// import DivingGroupForm from "./divingGroupForm";
// import Gallery from "./gallery";
// import GalleryForm from "./galleryForm";

// import Holiday from "./holiday";
// import HolidayForm from "./holidayForm";
// import HolidayGalleryForm from "./holidayGalleryForm";
// import HolidayGroupForm from "./holidayGroupForm";

// import InterestForm from "./interestForm";
// import LoginForm from "./loginForm";
// import Logout from "./logout";

// import MusicForm from "./musicForm";
// import Music from "./music";

// import Nrl from "./nrl";
// import NrlForm from "./nrlForm";
// import NrlGalleryForm from "./nrlGalleryForm";
// import NrlGroupForm from "./nrlGroupForm";

// import PrivacyForm from "./privacyForm";
// import Privacy from "./privacy";

// import ProfileOrder from "./profileOrder";
// import ProfileGroupForm from "./profileGroupForm";
// import ProfileGalleryForm from "./profileGalleryForm";
// import ProfileForm from "./profileForm";
// import Profile from "./profile";

// import ContactForm from "./contactUs";

// import QualificationsForm from "./qualificationsFrom";

// import RegisterForm from "./registerForm";

// import Rugby from "./rugby";
// import RugbyForm from "./rugbyForm";
// import RugbyGalleryForm from "./rugbyGalleryForm";
// import RugbyGroupForm from "./rugbyGroupForm";

// import Swimming from "./swimming";
// import SwimmingForm from "./swimmingForm";
// import SwimmingGalleryForm from "./swimmingGalleryForm";
// import SwimmingGroupForm from "./swimmingGroupForm";
//import WorkexperinceForm from "./workexperienceForm";

//import Gallery from "./common/gallery";

const Routes = () => {
	return (
		<Router>
			<NavBar />
			<main className="container-fluid">
				<MainRoutes>
					<Route path="/home" element={<Home />} />
					<Route path="/" element={<Home />} />
					<Route path="" element={<Home />} />
				</MainRoutes>
			</main>
		</Router>
		//   <MainRoutes>
		//     <Route path="/aboutGallery/new" element={<AboutGalleryForm />} />
		//     <Route path="/aboutGroup/new" element={<AboutGroupForm />} />
		//     <Route path="/aboutGroup/:id" element={<AboutGroupForm />} />
		//     <Route path="/about/:id" element={<AboutForm />} />
		//     <Route path="/about/new" element={<AboutForm />} />
		//     <Route path="/about" element={<About />} />
		//     <Route path="/actorGallery/new" element={<ActorGalleryForm />} />
		//     <Route path="/actorGallery/:id" element={<ActorGalleryForm />} />
		//     <Route path="/actors" element={<Actor />} />
		//     <Route path="/addFormula/:id" element={<FormulaForm />} />

		//     <Route path="/background" element={<BgForm />} />
		//     <Route path="/contactUs" element={<ContactForm />} />

		//     <Route path="/divingGroup/new" element={<DivingGroupForm />} />
		//     <Route path="/divingGroup/:id" element={<DivingGroupForm />} />
		//     <Route path="/divingGallery/new" element={<DivingGalleryForm />} />
		//     <Route path="/divingGallery/:id" element={<DivingGalleryForm />} />
		//     <Route path="/diving/new" element={<DivingForm />} />
		//     <Route path="/diving/:id" element={<DivingForm />} />

		//     <Route path="/diving" element={<Diving />} />

		//     <Route path="/gallery/new" element={<GalleryForm />} />
		//     <Route path="/gallery/:id" element={<GalleryForm />} />

		//     <Route path="/gallery" element={<Gallery />} />

		//     <Route path="/holidayGroup/new" element={<HolidayGroupForm />} />
		//     <Route path="/holidayGroup/:id" element={<HolidayGroupForm />} />
		//     <Route path="/holidayGallery/new" element={<HolidayGalleryForm />} />
		//     <Route path="/holidayGallery/:id" element={<HolidayGalleryForm />} />
		//     <Route path="/holiday/new" element={<HolidayForm />} />
		//     <Route path="/holiday/:id" element={<HolidayForm />} />

		//     <Route path="/holiday" element={<Holiday />} />

		//     <Route path="/homeGroup/new" element={<HomeGroupForm />} />
		//     <Route path="/homeGroup/:id" element={<HomeGroupForm />} />
		//     <Route path="/home/new" element={<HomeForm />} />
		//     <Route path="/home/:id" element={<HomeForm />} />
		//     <Route path="/home" element={<Home />} />
		//     <Route path="/interest/new" element={<InterestForm />} />
		//     <Route path="/interest/:id" element={<InterestForm />} />

		//     <Route path="/logout" element={<Logout />} />
		//     <Route path="/login" element={<LoginForm />} />
		//     <Route path="/privacy/new" element={<PrivacyForm />} />
		//     <Route path="/privacy/:id" element={<PrivacyForm />} />
		//     <Route path="/privacy" element={<Privacy />} />

		//     <Route path="/music/new" element={<MusicForm />} />
		//     <Route path="/music/:id" element={<MusicForm />} />
		//     <Route path="/music" element={<Music />} />

		//     <Route path="/nrlGroup/new" element={<NrlGroupForm />} />
		//     <Route path="/nrlGroup/:id" element={<NrlGroupForm />} />
		//     <Route path="/nrlGallery/new" element={<NrlGalleryForm />} />
		//     <Route path="/nrlGallery/:id" element={<NrlGalleryForm />} />
		//     <Route path="/nrl/new" element={<NrlForm />} />
		//     <Route path="/nrl/:id" element={<NrlForm />} />
		//     <Route path="/nrl" element={<Nrl />} />

		//     <Route path="/profileOrder" element={<ProfileOrder/>} />
		//     <Route path="/profileGroup/new" element={<ProfileGroupForm/>} />
		//     <Route path="/profileGroup/:id" element={<ProfileGroupForm/>} />
		//     <Route path="/profileGallery/new" element={<ProfileGalleryForm/>} />
		//     <Route path="/profileGallery/:id" element={<ProfileGalleryForm/>} />
		//     <Route path="/profile/new" element={<ProfileForm/>} />
		//     <Route path="/profile/:id" element={<ProfileForm/>} />

		//     <Route path="/profile" element={<Profile/>} />

		//     <Route path="/qualifications/new" element={<QualificationsForm />} />
		//     <Route path="/qualifications/:id" element={<QualificationsForm />} />
		//     <Route path="/register" element={<RegisterForm />} />

		//     <Route path="/rugbyGroup/new" element={<RugbyGroupForm />} />
		//     <Route path="/rugbyGroup/:id" element={<RugbyGroupForm />} />
		//     <Route path="/rugbyGallery/new" element={<RugbyGalleryForm />} />
		//     <Route path="/rugbyGallery/:id" element={<RugbyGalleryForm />} />
		//     <Route path="/rugby/new" element={<RugbyForm />} />
		//     <Route path="/rugby/:id" element={<RugbyForm />} />

		//     <Route path="/rugby" element={<Rugby />} />

		//     <Route path="/swimmingGroup/new" element={<SwimmingGroupForm />} />
		//     <Route path="/swimmingGroup/:id" element={<SwimmingGroupForm />} />
		//     <Route path="/swimmingGallery/new" element={<SwimmingGalleryForm />} />
		//     <Route path="/swimmingGallery/:id" element={<SwimmingGalleryForm />} />
		//     <Route path="/swimming/new" element={<SwimmingForm />} />
		//     <Route path="/swimming/:id" element={<SwimmingForm />} />

		//     <Route path="/swimming" element={<Swimming />} />

		//     <Route path="/workexperience/new" element={<WorkexperinceForm />} />
		//     <Route path="/workexperience/:id" element={<WorkexperinceForm />} />
		//     <Route path="/" element={<Home />} />
		//     <Route element={<Home />} />
		// </MainRoutes>
	);
};
export default Routes;
