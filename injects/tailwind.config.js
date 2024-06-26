tailwind.config = {
    prefix: 'tw-',
    content: ['../js/*'],
    preflight: false,
    theme: {
        extend: {
            screens: {
                sm: '576px',
                md: '768px',
                lg: '992px',
                xl: '1200px',
                xxl: '1600px',
                '3xl': '1920px'
            }
        },
        boxShadow: {
            xs: '0px 1px 2px 0px #1018280A', // shadow-xsmall
            sm: '0px 2px 6px 0px #1018280F', // shadow-small
            md: '0px 6px 15px -2px #10182814', // shadow-medium
            lg: '0px 8px 24px -3px #1018281A', // shadow-large
            xl: '0px 20px 40px -8px #1018281A', // shadow-xlarge
            xxl: '0px 25px 60px -15px #10182833' // shadow-xxlarge
        },
        colors: {
            red: 'red',
            neutral: {
                '0': 'rgb(255, 255, 255)',
                '50': 'rgb(249, 250, 251)',
                '100': 'rgb(242, 244, 247)',
                '200': 'rgb(234, 236, 240)',
                '300': 'rgb(208, 213, 221)',
                '400': 'rgb(152, 162, 179)',
                '500': 'rgb(102, 112, 133)',
                '600': 'rgb(71, 84, 103)',
                '700': 'rgb(52, 64, 84)',
                '800': 'rgb(24, 34, 48)',
                '900': 'rgb(16, 24, 40)',
                '950': 'rgb(12, 17, 29)',
                '1000': 'rgb(0, 0, 0)'
            },
            primary: {
                '50': 'rgb(240, 249, 255)',
                '100': 'rgb(224, 242, 254)',
                '200': 'rgb(185, 230, 254)',
                '300': 'rgb(124, 212, 253)',
                '400': 'rgb(54, 191, 250)',
                '500': 'rgb(11, 165, 236)',
                '600': 'rgb(0, 134, 201)',
                '700': 'rgb(2, 106, 162)',
                '800': 'rgb(6, 89, 134)',
                '900': 'rgb(11, 74, 111)',
                '950': 'rgb(6, 44, 65)'
            },
            success: {
                '50': 'rgb(236, 253, 243)',
                '100': 'rgb(220, 250, 230)',
                '200': 'rgb(171, 239, 198)',
                '300': 'rgb(117, 224, 167)',
                '400': 'rgb(71, 205, 137)',
                '500': 'rgb(23, 178, 106)',
                '600': 'rgb(7, 148, 85)',
                '700': 'rgb(6, 118, 71)',
                '800': 'rgb(8, 93, 58)',
                '900': 'rgb(7, 77, 49)',
                '950': 'rgb(5, 51, 33)'
            },
            warning: {
                '50': 'rgb(255, 250, 235)',
                '100': 'rgb(254, 240, 199)',
                '200': 'rgb(254, 223, 137)',
                '300': 'rgb(254, 200, 75)',
                '400': 'rgb(253, 176, 34)',
                '500': 'rgb(247, 144, 9)',
                '600': 'rgb(220, 104, 3)',
                '700': 'rgb(181, 71, 8)',
                '800': 'rgb(147, 55, 13)',
                '900': 'rgb(122, 46, 14)',
                '950': 'rgb(78, 29, 9)'
            },
            error: {
                '50': 'rgb(254, 243, 242)',
                '100': 'rgb(254, 228, 226)',
                '200': 'rgb(254, 205, 202)',
                '300': 'rgb(253, 162, 155)',
                '400': 'rgb(249, 112, 102)',
                '500': 'rgb(240, 68, 56)',
                '600': 'rgb(217, 45, 32)',
                '700': 'rgb(180, 35, 24)',
                '800': 'rgb(145, 32, 24)',
                '900': 'rgb(122, 39, 26)',
                '950': 'rgb(85, 22, 12)'
            },
            alpha: {
                '10%': 'rgba(255, 255, 255, 0.1)',
                '20%': 'rgba(255, 255, 255, 0.2)',
                '30%': 'rgba(255, 255, 255, 0.3)',
                '40%': 'rgba(255, 255, 255, 0.4)',
                '50%': 'rgba(255, 255, 255, 0.5)',
                '60%': 'rgba(255, 255, 255, 0.6)',
                '70%': 'rgba(255, 255, 255, 0.698)',
                '80%': 'rgba(255, 255, 255, 0.8)',
                '90%': 'rgba(255, 255, 255, 0.898)',
                '100%': 'rgb(255, 255, 255)'
            },
        }
    }
}
