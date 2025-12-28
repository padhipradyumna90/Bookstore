import { Icon } from "next/dist/lib/metadata/types/metadata-types"
import { ReactNode } from "react"

export type NavArrType ={
    title: string
    path: string
    id:number
}
//HomePage/DiscountSlider
export type DiscountSliderArrType ={
    id:number
    image:{
        src:string

    }
   
}
//Home-page/Herosection/Popular catagory
export type PopularCategoryArrType ={
    image:{
        src:string
    }
    id:number
    title:string

}
//HOme-page-Herosection/New Releases slider1
export type NewReleaseArrType ={
    id:number
    image:{
        src:string
    }
    title:string
    description:string
    ratings: number
}

// home page bestselling nonfiction slider2

export type BestsellingNonfictionArrType ={
    id:number
    image:{
        src:string
    }
    title:string
    author:string
    description:string
    ratings: number
}
//banner slider

export type BannerSliderArrType ={
    id:number
    image:{
        src:string
    }
    
}
//discount slider

// export type DiscountSliderType ={
//     id:number
//     image:{
//         src:string
//     }
//     title:string
//     author:string
//     price:string
//     discountPrice:string
// }