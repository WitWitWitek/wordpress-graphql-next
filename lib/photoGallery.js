export const getImagesGallery = async (uri) => {
    const photoGalleryRes = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wp/v2/posts`)
    const photoGalleryData = await photoGalleryRes.json()

    const [postData] = photoGalleryData.filter(data => data.slug === uri);
    return postData.acf.photoGallery || []
}

