import React, {useState} from 'react'
import {placesStore} from '../store/Store'
import "../styles/Tab1.css";
import {Link} from 'react-router-dom';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/bundle';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {FiHeart} from "react-icons/fi"
import {IoBedOutline} from "react-icons/io5"
import {GiBathtub} from "react-icons/gi"
import {BsStars} from "react-icons/bs"
import {BiBuildingHouse} from "react-icons/bi"
import {Pagination} from "swiper";
import announcementImg from "../../src/styles/Airbnb-demo-feature-announcement.png"


//TAB 1 = TROPICAL
let registered = false;
let savedCtx;


const Tab1 = ({pushDown}) => {
    const [showAnnouncementPopup, setShowAnnouncementPopup] = useState(false);
    const [showAnnouncementInline, setShowAnnouncementInline] = useState(false);
    const [stores, setStores] = useState(placesStore)

    !registered && window.Contextual && window.Contextual.ready(() => {
        registered = true;

        // NPS list row insertion
        window.Contextual.registerGuideBlock('pz-nps', (ctx) => {
            const nps = document.createElement('pz-nps');
            nps.source = ctx.stepPayload.feedback;
            nps.style.backgroundColor='white';
            nps.style.padding='24px 32px'
            nps.addEventListener('afterRender', () => ctx.afterRender());
            nps.addEventListener('afterShow', () => ctx.afterShow());
            nps.addEventListener('selectFeedback', (e) =>
                ctx.sendFeedback({...e.detail, customJson: extra_json.extra_feedback})
            );
            nps.addEventListener('submit', (e) => (ctx.next(), nps.remove(), container.style.display='none'));

            const {extra_json} = ctx.stepPayload;
            const {display} = extra_json;
            let container;

            if (display === 'inline') {
                container = document.querySelector('#nps-inline');
            } else {
                container = document.querySelector('#nps-popup');
            }
            container.appendChild(nps);
            container.style.display='flex';
        });

        // Fancy Announcement - image
        window.Contextual.registerGuideBlock('custom-announcement', (ctx) => {
            savedCtx = ctx
            const {extra_json} = ctx.stepPayload;
            const {display,position = 0} = extra_json;
            if (display === 'inline') {
                const modified = [...placesStore];
                modified.splice(position, 0, {type: 'custom'})
                setStores(modified)
                setShowAnnouncementInline(true)
            } else {
                setShowAnnouncementPopup(true);
            }
        })

        // Fancy Announcement - use style data from Contextual
        /*window.Contextual.registerGuideBlock('custom-announcement-style', (ctx) => {
            savedCtx = ctx
            const payload = ctx.stepPayload;
            const {title,content,meta} = payload;
            const container = document.createElement()
        })*/
    })

    return (
        <div>
            <div
                className='tab1-hold flex justify-center md:mb-48 mb-28 items-center sm:gap-12 gap-0 -mt-16 flex-wrap w-full'>
                {/*nps popup*/}
                <div id="nps-popup" style={{
                    display: 'none',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: "fixed",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    zIndex: 99
                }}></div>

                {/*nps inline*/}
                <div id="nps-inline" style={{display: 'none', justifyContent: 'center'}}></div>

                {/*announcement popup*/}
                {showAnnouncementPopup ? (
                    <div id="fancy-announcement-popup"
                         style={{
                             display: 'flex',
                             justifyContent: 'center',
                             alignItems: 'center',
                             position: "fixed",
                             top: 0,
                             bottom: 0,
                             left: 0,
                             right: 0,
                             backgroundColor: "rgba(0,0,0,0.5)",
                             zIndex: 99
                         }}>
                        <img src={announcementImg} style={{width: '300px', cursor: 'pointer'}}
                             onClick={() => savedCtx && (savedCtx.next(), setShowAnnouncementPopup(false))}/>
                    </div>
                ) : null}

                {/*{showAnnouncementStylePopup ? (
                    <div id="fancy-announcement-style-popup"
                         style={{
                             display: 'flex',
                             justifyContent: 'center',
                             alignItems: 'center',
                             position: "fixed",
                             top: 0,
                             bottom: 0,
                             left: 0,
                             right: 0,
                             backgroundColor: "rgba(0,0,0,0.5)",
                             zIndex: 99
                         }}>
                        <div className="container" style={containerStyle}
                             onClick={() => savedCtx && (savedCtx.next(), setShowAnnouncementStylePopup(false))}>
                            <div className="title"></div>
                            <div className="content"></div>
                            <div className="button-container">
                                <button type="button" style={prevBtnStyle}></button>
                                <button type="button" style={nextBtnStyle}></button>
                            </div>
                        </div>
                    </div>
                ) : null}*/}


                {stores.map((item => {
                    if (item.type === "tropical") {
                        return (
                            <div className='card boxsh' key={item.id}>

                                <Link to={`/${item.id}`}>

                                    <Swiper
                                        spaceBetween={5}
                                        slidesPerView={1}
                                        navigation={{
                                            nextEl: ".swiper-button-next",
                                            prevEl: ".swiper-button-prev",
                                        }}
                                        loop={true}
                                        observer={true}
                                        observeParents={true}
                                        parallax={true}
                                        pagination={{
                                            clickable: true,
                                        }}
                                        modules={[Pagination]}

                                    >
                                        <SwiperSlide>
                                            <img src={item.homeMainPic} className="cardImg"/>
                                        </SwiperSlide>

                                        <SwiperSlide>
                                            <img src={item.carouselPic1} className="cardImg"/>
                                        </SwiperSlide>

                                        <SwiperSlide>
                                            <img src={item.carouselPic2} className="cardImg"/>
                                        </SwiperSlide>

                                        <SwiperSlide>
                                            <img src={item.carouselPic3} className="cardImg"/>
                                        </SwiperSlide>

                                        <SwiperSlide>
                                            <img src={item.carouselPic4} className="cardImg"/>
                                        </SwiperSlide>

                                        <SwiperSlide>
                                            <img src={item.carouselPic5} className="cardImg"/>
                                        </SwiperSlide>

                                    </Swiper>

                                    {item.pets && <div className='flex label'><BsStars/> POPULAR </div>}

                                    <div className='flex gap-0 pl-3 pr-3 justify-between'>

                                        <div className='flex'>
                                            <p className=' text-violet-600 font-semibold mr-1 text-2xl'> ${item.price.toLocaleString()}</p>
                                            <p className='text-gray-400 text-sm pt-2'> /month </p>
                                        </div>

                                        <FiHeart className='text-sm heartCrad  boxsh'/>

                                    </div>

                                    <p className='text-2xl pl-3'> {item.name} </p>

                                    <p className='text-gray-400 text-sm pl-3 mb-3 mt-2'> 2699 Green Valley hughland lake
                                        ... </p>
                                    <hr className='mb-4'/>

                                    <div className='flex justify-center pl-2 gap-4 md:gap-3'>
                                        <span className='flex items-center'> <IoBedOutline
                                            className=' md:text-2xl text-xl mr-2'/> <p
                                            className='text-sm text-gray-400 w-16'>{Math.floor(Math.random() * 5) + 2} beds </p></span>
                                        <span className='flex items-center'> <GiBathtub
                                            className=' md:text-2xl text-xl mr-2'/> <p
                                            className='text-sm text-gray-400 w-16'>{Math.floor(Math.random() * 5) + 2} bath </p> </span>
                                        <span className='flex items-center'> <BiBuildingHouse
                                            className=' md:text-2xl text-xl mr-2'/> <p
                                            className='text-sm text-gray-400 w-16'> {Math.floor(Math.random() * 2) + 2} floors </p></span>

                                    </div>

                                </Link>
                            </div>
                        )
                    } else if (item.type === 'custom') {
                        return showAnnouncementInline ? (
                            <div id="fancy-announcement-row-insertion"
                                 onClick={() => savedCtx && (savedCtx.next(), setShowAnnouncementInline(false))}
                                 style={{display: 'flex', justifyContent: 'center'}}>
                                <img src={announcementImg} style={{width: '300px', cursor: 'pointer'}}/>
                            </div>
                        ) : null;
                    }
                }))}

            </div>

        </div>
    )
}

export default Tab1
//
