import { createClient } from "@supabase/supabase-js";

const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6cWVia2l1dm9vc2F0d25ucWhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxMjg3ODQsImV4cCI6MjA3MTcwNDc4NH0.73NFIRmqQo2l3ZxEbcET_HBHCEJzf1Q6gMA4F_CVKzk"
const supabaseUrl = "https://wzqebkiuvoosatwnnqhp.supabase.co"

const supabase = createClient(supabaseUrl, anonKey);

/*
supabase.storage.from("images").upload(file.name, file, {
            cacheControl: "3600",
            upsert: false,
        }).then((res) => {
            const publicUrl = supabase.storage.from("images").getPublicUrl(file.name).data.publicUrl;
            console.log(publicUrl);
        }).catch((err) => {
            console.log(err);
        });
*/

export default function mediaUpload(file) {
    return new Promise((resolve, reject) => {

        if (file == null) {
            reject("No file provided");
        } else {
            const timestamp = new Date().getTime();
            const fileName = timestamp + file.name;

            supabase.storage
                .from("images")
                .upload(fileName, file, {
                    cacheControl: "3600",
                    upsert: false,
                }).then(() => {
                    const publicUrl = supabase.storage.from("images").getPublicUrl(file.name).data.publicUrl;
                    resolve(publicUrl);
                }).catch(() => {
                    reject("Error uploading file");
                });
        }
    });
}