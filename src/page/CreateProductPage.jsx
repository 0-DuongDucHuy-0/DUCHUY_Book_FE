import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import AsideAmin from "../components/AsideAmin";
import * as CategoryServices from "../services/CategoryServices";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import * as UpLoadServices from "../services/UpLoadServices";
import * as ProductServices from "../services/ProductServices";
import * as ProductImgServices from "../services/ProductImgServices";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function CreateProductPage() {
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm();
    const [avatar, setAvatar] = useState(null);
    const [img2, setImg2] = useState(null);
    const [img3, setImg3] = useState(null);

    const onDrop = (acceptedFiles) => {
        setAvatar(acceptedFiles[0]);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: "image/*" });

    const onSubmit = async (data) => {
        const resUpLoadAvatar = await UpLoadServices.UpLoadImg(avatar)
        const resUpLoadImg1 = await UpLoadServices.UpLoadImg(img2)
        const resUpLoadImg2 = await UpLoadServices.UpLoadImg(img3)

        if (resUpLoadAvatar.success) {
            console.log({ ...data, avatar: resUpLoadAvatar.data.url });
            const resUpLoadProduct = await ProductServices.createProduct({ ...data, avatar: resUpLoadAvatar.data.url })
            console.log(resUpLoadProduct)
            if (resUpLoadProduct.status === "OK") {
                // thêm ảnh mô tả 
                const UploadImg = await ProductImgServices.createProductImg({
                    product_id: resUpLoadProduct.data.insertId,
                    path: resUpLoadAvatar.data.url
                })
                const UploadImg1 = await ProductImgServices.createProductImg({
                    product_id: resUpLoadProduct.data.insertId,
                    path: resUpLoadImg1.data.url
                })
                const UploadImg2 = await ProductImgServices.createProductImg({
                    product_id: resUpLoadProduct.data.insertId,
                    path: resUpLoadImg2.data.url
                })
                if (UploadImg1.status === "OK" && UploadImg2.status === "OK" && UploadImg.status === "OK") {
                    console.log("Thêm thành công")
                    toast.success("Thêm sản phẩm thành công", {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: true,
                        theme: "light",
                        className: "bg-blue-500 text-white font-semibold border-2 border-green-500",
                    });
                } else {
                    console.error("Error upload img")
                }
            } else {
                console.error("Error create product")
            }
        }
    };

    const [listCategory, setListCategory] = useState([])

    const fetchData = async () => {
        const res = await CategoryServices.getAllCategory();
        if (res?.status === "OK") {
            setListCategory(res?.data);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <AsideAmin />
            <ToastContainer />

            <div className="w-full lg:ps-64">
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                    <div className="flex h-full">
                        <main className="w-full p-6">
                            <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                                <h2 className="text-xl font-bold mb-4">Create Product Book</h2>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    <input {...register("name")} placeholder="Name" className="w-full p-2 border rounded" />
                                    <textarea {...register("description")} placeholder="Description" className="w-full p-2 border rounded" />
                                    <textarea {...register("content")} placeholder="Content" className="w-full p-2 border rounded" />

                                    <div {...getRootProps()} className="p-4 border rounded cursor-pointer text-center">
                                        <input {...getInputProps()} />
                                        {avatar ? <p>{avatar.name}</p> : <p>Tải lên ảnh đại diện</p>}
                                    </div>

                                    <div className="p-4 border rounded cursor-pointer text-center" onClick={() => document.getElementById("img2").click()}>
                                        <input type="file" onChange={(e) => setImg2(e.target.files[0])} className="hidden" id="img2" />
                                        {img2 ? <p>{img2.name}</p> : <p>Tải lên ảnh mô tả thứ 1</p>}
                                    </div>

                                    <div className="p-4 border rounded cursor-pointer text-center" onClick={() => document.getElementById("img3").click()}>
                                        <input type="file" onChange={(e) => setImg3(e.target.files[0])} className="hidden" id="img3" />
                                        {img3 ? <p>{img3.name}</p> : <p>Tải lên ảnh mô tả thứ 2</p>}
                                    </div>


                                    <select {...register("category_id")} className="w-full p-2 border rounded">
                                        <option value="">Chọn thể loại</option>
                                        {listCategory.map((category) => (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        ))}
                                    </select>
                                    <input {...register("hot")} type="checkbox" /> Hot
                                    <input {...register("price")} placeholder="Price" type="number" className="w-full p-2 border rounded" />
                                    <input {...register("sale")} placeholder="Sale" type="number" className="w-full p-2 border rounded" />
                                    <input {...register("author")} placeholder="Author" className="w-full p-2 border rounded" />
                                    <input {...register("publisher")} placeholder="Publisher" className="w-full p-2 border rounded" />
                                    <input {...register("dimensions")} placeholder="Dimensions" className="w-full p-2 border rounded" />
                                    <input {...register("publication_year")} placeholder="Publication Year" type="number" className="w-full p-2 border rounded" />
                                    <input {...register("page_count")} placeholder="Page Count" type="number" className="w-full p-2 border rounded" />
                                    <input {...register("weight")} placeholder="Weight" type="number" className="w-full p-2 border rounded" />
                                    <input {...register("cover_type")} placeholder="Cover Type" className="w-full p-2 border rounded" />

                                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Submit</button>
                                </form>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateProductPage;
