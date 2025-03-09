import { useFonts } from 'expo-font';
import {
    Poppins_100Thin as Thin,
    Poppins_100Thin_Italic as ThinItalic,
    Poppins_200ExtraLight as ExtraLight,
    Poppins_200ExtraLight_Italic as ExtraLightItalic,
    Poppins_300Light as Light,
    Poppins_300Light_Italic as LightItalic,
    Poppins_400Regular as Regular,
    Poppins_400Regular_Italic as RegularItalic,
    Poppins_500Medium as Medium,
    Poppins_500Medium_Italic as MediumItalic,
    Poppins_600SemiBold as SemiBold,
    Poppins_600SemiBold_Italic as SemiBoldItalic,
    Poppins_700Bold as Bold,
    Poppins_700Bold_Italic as BoldItalic,
    Poppins_800ExtraBold as ExtraBold,
    Poppins_800ExtraBold_Italic as ExtraBoldItalic,
    Poppins_900Black as Black,
    Poppins_900Black_Italic as BlackItalic,
} from '@expo-google-fonts/poppins';

export const Fonts = () => {
    return useFonts({
        Thin,
        ThinItalic,
        ExtraLight,
        ExtraLightItalic,
        Light,
        LightItalic,
        Regular,
        RegularItalic,
        Medium,
        MediumItalic,
        SemiBold,
        SemiBoldItalic,
        Bold,
        BoldItalic,
        ExtraBold,
        ExtraBoldItalic,
        Black,
        BlackItalic
    })
}