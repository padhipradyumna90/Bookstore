import { banner_img1, banner_img2, banner_img3, discount_img1, discount_img2, discount_img3, herosection_img1, herosection_img10, herosection_img11, herosection_img12, herosection_img13, herosection_img14, herosection_img15, herosection_img16, herosection_img2, herosection_img3, herosection_img4, herosection_img5, herosection_img6, herosection_img7, herosection_img8, herosection_img9, img1, img2, img3, img4, newreleases_img1, newreleases_img10, newreleases_img11, newreleases_img12, newreleases_img2, newreleases_img3, newreleases_img4, newreleases_img5, newreleases_img6, newreleases_img7, newreleases_img8, newreleases_img9, nonfiction1, nonfiction10, nonfiction11, nonfiction12, nonfiction2, nonfiction3, nonfiction4, nonfiction5, nonfiction6, nonfiction7, nonfiction8, nonfiction9 } from "@/assets/Home";
import { BannerSliderArrType, BestsellingNonfictionArrType, DiscountSliderArrType, NewReleaseArrType, PopularCategoryArrType } from "@/types";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarRateIcon from '@mui/icons-material/StarRate';

export const DiscountSliderArr:DiscountSliderArrType[]=[
    {
        id: "681b26efd1ebc4ddfb28fe99",
        image: img1,
        
      },
      {
        id: "681b2813d1ebc4ddfb28fea1",
        image: img2,
        
      },
      {
        id: "681b27acd1ebc4ddfb28fe9d",
        image: img3,
        
      },
      {
        id: "6819eecff7309f3fa20959be",
        image: img4,
        
      }
     
    ];
    //herosection
    export const PopularCategoryArr:PopularCategoryArrType[]=[
      {
        id:1,
        image:herosection_img1,
        title:'Analysis & Strategy'
      },
      {id:2,
        image:herosection_img2,title:'Business,Investment & Economics'
      },
      {id:3,image:herosection_img3,title:'Fantasy'},
      {id:4,image:herosection_img4,title:'Health & Wellness'},
      {id:5,image:herosection_img5,title:'History'},
      {id:6,image:herosection_img6,title:'Mental Health & Well Being'},
      {id:7,image:herosection_img7,title:'Non-Fiction'},
      {id:8,image:herosection_img8,title:'Personal Development'},
      {id:9,image:herosection_img9,title:'Personal Finance'},
      {id:10,image:herosection_img10,title:'Philosophy & Spirituality'},
      {id:11,image:herosection_img11,title:'Poetry'},
      {id:12,image:herosection_img12,title:'Relationships'},
      {id:13,image:herosection_img13,title:'Romance'},
      {id:14,image:herosection_img14,title:'Science'},
      {id:15,image:herosection_img15,title:'Self & Help'},
      {id:16,image:herosection_img16,title:'Young & Adult Fiction'},
    ]
//herosection new releases


export const NewReleaseArr: NewReleaseArrType[] = [
  {
    id: "6819ec4ef7309f3fa20959aa",
    image: newreleases_img1,
    title: "Come As You Are",
    description: "A groundbreaking book about the science of sexuality, exploring how to understand and improve one's intimate life.",
    ratings:4.5
  },
  {
    id: "6819ed22f7309f3fa20959b2",
    image: newreleases_img2,
    title: "Days At The Morisaki Bookshop",
    description: "A heartwarming Japanese novel about love, loss, and finding solace in books.",
    ratings:3
  },
  {
    id: "6819edbff7309f3fa20959b6",
    image: newreleases_img3,
    title: "Everything Is Fucked",
    description: "A thought-provoking book by Mark Manson that explores hope, meaning, and resilience in a chaotic world.",
    ratings:5
  },
  {
    id: "6819ee27f7309f3fa20959ba",
    image: newreleases_img4,
    title: "I Want To Die But I Want To Eat",
    description: "A deeply personal memoir that examines mental health struggles and the journey to self-acceptance.",
    ratings:5
  },
  {
    id: "6819eecff7309f3fa20959be",
    image: newreleases_img5,
    title: "Sanyaas in the City",
    description: "An exploration of mindfulness, spirituality, and self-discovery in the modern urban landscape.",
    ratings:5
  },
  {
    id: "6819ef25f7309f3fa20959c2",
    image: newreleases_img6,
    title: "Stillness Is The Key",
    description: "A powerful book by Ryan Holiday about the art of stillness and how it can bring clarity, success, and peace.",
    ratings:4.5
  },
  {
    id: "6819f034f7309f3fa20959c9",
    image: newreleases_img7,
    title: "The 10 New Life Changing Skills",
    description: "A practical guide to developing essential skills that lead to personal and professional transformation.",
    ratings:3.5
  },
  {
    id: "6819e72ef7309f3fa20959a0",
    image: newreleases_img8,
    title: "The Bell Jar",
    description: "A classic semi-autobiographical novel by Sylvia Plath, delving into mental health, identity, and womanhood.",
    ratings:5
  },
  {
    id: "6819f088f7309f3fa20959cd",
    image: newreleases_img9,
    title: "The New Rules Of Business",
    description: "A modern guide to navigating business success with innovative strategies and leadership insights.",
    ratings:2
  },
  {
    id: "6819f0e6f7309f3fa20959d1",
    image: newreleases_img10,
    title: "The Obstacle Is The Way",
    description: "A book inspired by Stoic philosophy, teaching how to turn adversity into an advantage.",
    ratings:1
  },
  {
    id: "6819f131f7309f3fa20959d5",
    image: newreleases_img11,
    title: "Unfolding the Life",
    description: "A reflective journey on personal growth, self-awareness, and uncovering one’s purpose.",
    ratings:3
  },
  {
    id: "6819f176f7309f3fa20959d9",
    image: newreleases_img12,
    title: "Vitamin Gr",
    description: "An inspiring book about the power of gratitude and its impact on mental and emotional well-being.",
    ratings:4
  },
];

//popular nonfiction books
export const BestsellingNonfictionArr:BestsellingNonfictionArrType[]=[
  {
    id:"681b2b2dd1ebc4ddfb28febe",
    image:nonfiction1,
    title:"Thinking Fast And Slow",
    author:"Daniel Kahneman",
    description:"",
    ratings:4.5
  },
  {id:"681b2ba9d1ebc4ddfb28fec2",
    image:nonfiction2,
    author:"Chris Voss",
    title:"Never Split The Difference",
    description:"",
    ratings:3
  },
  {
    id:"681b2c09d1ebc4ddfb28fec6",
    image:nonfiction3,
    title:"The Compound Effect",
    author:"Darren-Hardy",
    description:"",
    ratings:4
  }
  ,{
    id:"681b2c7cd1ebc4ddfb28feca",
    image:nonfiction4,
    title:"The-Psychology-Of-Selling",
    author:"Brian Tracy",
    description:"",
    ratings:3.5
  },
  {
    id:"681b2cd2d1ebc4ddfb28fece",
    image:nonfiction5,
    title:"Autobiography Of A Yogi",
    author:"Paramahansa Yoganda  ",
    description:"",
    ratings:4
  },
  {
    id:"681b2d15d1ebc4ddfb28fed2",
    image:nonfiction6,
    title:"Never Finished",
    author:"David Goggins",
    description:"",
    ratings:4.5
  },
  {
    id:"681b2d75d1ebc4ddfb28fed6",
    image:nonfiction7,
    title:"The 4 Hour Work Week",
    author:"Timothy Ferriss",
    description:"",
    ratings:4
  },
  {
    id:"681b2dc6d1ebc4ddfb28feda",
    image:nonfiction8,
    title:"The Courage To Be Happy",
    author:"Ichiro Kishimi",
    description:"",
    ratings:4
  },
  {
    id:"681b2e07d1ebc4ddfb28fede",
    image:nonfiction9,
    title:"Show Your Work",
    author:"Austin Cleon",
    description:"",
    ratings:4.5

  },
  {
    id:"681b2e99d1ebc4ddfb28fee2",
    image:nonfiction10,
    title:"Your Too Good To Feel This Bad",
    author:"Nate Dallas",
    description:"",
    ratings:4
  },
  {
    id:"681b2ee8d1ebc4ddfb28fee6",
    image:nonfiction11,
    title:"Surrounded By Idiots",
    author:"Thomas Erikson",
    description:"",
    ratings:4.5
  },
  {
    id:"681b2f4ed1ebc4ddfb28feea",
    image:nonfiction12,
    title:"Think And Grow Rich",
    author:" Napoleon Hill",
    description:"",
    ratings:4.5
  }

]
// banner 
export const BannerSliderArr:BannerSliderArrType[]=[
  {
    id:"681b3196d1ebc4ddfb28fef4",
    image: banner_img1
  },
  {
    id:"681b3235d1ebc4ddfb28fef8",
    image: banner_img2
  },
  {id:"681b32ebd1ebc4ddfb28fefc",image:banner_img3}
]

//discoutn slider
// export const DiscoutSliderArr:DiscountSliderArrType[]=[
 
//     {
//       id: 1,
//       discountPrice: "$12",
//       author: "Eveie Woods",
//       price: "$20",
//       image: discount_img1,
//       title: "The Lost Bookshop",
//     },
//     {
//       id: 2,
//       title: "Ram Scion Of Ikshavaku",
//       author: "Amish Tripathi",
//       price: "$18",
//       discountPrice: "$10",
//       image: discount_img2,
//     },
//     {
//       id: 3,
//       title: "48 Hours Startup",
//       author: "Fraser Dohetry",
//       price: "$22",
//       discountPrice: "$14",
//       image: discount_img3,
//     },
 
// ]