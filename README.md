# Employee Management App

<img width="500" alt="Screenshot" src="https://github.com/jun-tsuno/employee-management-app/assets/110567844/f396ce46-d326-4a87-b9e6-ffa4761e87eb">

## Demo
➡️ https://employee-management-app-jade.vercel.app/

## ER
<p>
<img width="500" alt="Screenshot-ER" src="https://github.com/jun-tsuno/employee-management-app/assets/110567844/aff72fc7-75ab-4f01-95e5-0dee5cd82bd2">
</p>


## Feature
- Build APIs using DRF and Django to accelerate and simplify the development cycle.
- Extend the built-in authentication logic and create a unique user authentication model.
- Introduced a "feature-driven" folder structure to the client side, making it easier to locate and manage the features scope as the project grows.

## Learn
- Learned a basic understanding of django and its powerful API handling method, such as DRF and django-filter. This time I used APIViews from DRF, and I'd like to updated them using Viewsets to make the code even shorter.
- Organizing folder structure is a crucial part of development(especially when working with a team). I tried this feature base folder structure to make each functionality's scope easy to anticipate (although this project is too small to enjoy the benefit of this...) `feature` folder has sub folders divided by each 'functionality', and each function-folder has sub folders of `api` `components` `hooks`. The `feature-component` is where feature specific components belong, while `components` folder is where other generic ui components(such as `Button`) belong. (Likewise, hooks)
- I'd appreciate if you could give me your insights about this application!

## Built With
server
- `django`
- `django-rest-framework`
- `supabase`

client
- `Nextjs`
- `TailwindCSS`

deployed
- `Render`
