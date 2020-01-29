package app.avare.lib.configparser;

/*
        Copyright 2016-2019 AVARE project team

        AVARE-Project was financed by the Baden-Württemberg Stiftung gGmbH (www.bwstiftung.de).
        Project partners are FZI Forschungszentrum Informatik am Karlsruher
        Institut für Technologie (www.fzi.de) and Karlsruher
        Institut für Technologie (www.kit.edu).

        Licensed under the Apache License, Version 2.0 (the "License");
        you may not use this file except in compliance with the License.
        You may obtain a copy of the License at
        http://www.apache.org/licenses/LICENSE-2.0
        Unless required by applicable law or agreed to in writing, software
        distributed under the License is distributed on an "AS IS" BASIS,
        WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
        See the License for the specific language governing permissions and
        limitations under the License.
*/

import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class JSONParser {
    private FileReader fr;
    private String config;
    private JSONObject configJSON;

    public JSONParser() {
        this.fr = new FileReader();
        this.config = fr.readFile("preferences.json");
        try {
            this.configJSON = new JSONObject(this.config);
        } catch (JSONException e) {
            e.printStackTrace();
        }


    }

    private String getPackageName() {
        Log.i("JSON PARSER", "Trying to get package name...");
        try {
            throw new NullPointerException();
        } catch (NullPointerException e) {
            StackTraceElement[] stes = e.getStackTrace();
            //e.printStackTrace();
            Log.i("JSON PARSER ST", Log.getStackTraceString(e));
            for (StackTraceElement ste : stes) {
                String className = ste.getClassName();
                int pos = className.lastIndexOf('.');
                String packageName = className.substring(0, pos);
                Log.i("JSON PARSER", "packageName: " + packageName);
                if (!packageName.startsWith("app.avare") && !packageName.startsWith("android")) {
                    //Workaround to allow AVARE to read the config settings for a specific App
                    // X is the obfuscated name of the app
                    if(packageName.equals("X")) {
                        Log.i("JSON PARSER", "found (obfuscated) package name: " + "com.whatsapp");
                        return "com.whatsapp";
                    }
                    Log.i("JSON PARSER", "found package name: " + packageName);
                    return packageName;
                }
            }
        }
        return null;
    }


    private JSONObject getSettings(String categoryID) {
        Log.i("JSON PARSER", "calling getSettings on categoryID " + categoryID);
        try {
            JSONArray categories = this.configJSON.getJSONArray("categories");
            for (int i = 0; i < categories.length(); i++) {
                JSONObject category = categories.getJSONObject(i);
                if (category.getString("_id").equals(categoryID)) {
                    JSONObject categorySettings = category.getJSONObject("settings");
                    Log.i("JSON PARSER", "Returning settings for category: " + category.getString("_id"));
                    return categorySettings;
                }
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
        Log.i("JSON PARSER", "Cant find settings for category");
        return null;
    }

    private JSONObject getSettings() {
        try {
            JSONArray apps = this.configJSON.getJSONArray("apps");
            String packageName = this.getPackageName();
            for (int i = 0; i < apps.length(); i++) {
                JSONObject o = apps.getJSONObject(i);
                String _id = o.getString("_id");
                if (_id.equalsIgnoreCase(packageName) || _id.contains(packageName) || packageName.contains(_id)) {
                    JSONObject appSettings = o.getJSONObject("settings");
                    Log.i("JSON PARSER", "returning settings for _id: " + o.get("_id"));
                    return appSettings;
                }
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
        Log.i("JSON PARSER", "no settings were found");
        return null;
    }

    private String getCategoryId() {
        try {
            JSONArray apps = this.configJSON.getJSONArray("apps");
            String packageName = this.getPackageName();
            for (int i = 0; i < apps.length(); i++) {
                JSONObject o = apps.getJSONObject(i);
                String _id = o.getString("_id");
                if (_id.equalsIgnoreCase(packageName) || _id.contains(packageName) || packageName.contains(_id)) {
                    String category = o.getString("category_id");
                    Log.i("JSON PARSER", "returning categorySettings for category: " + category);
                    return category;
                }
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
        Log.i("JSON PARSER", "no category was found");
        return null;
    }

    public JSONArray getContactsSettings(String type) {
        try {
            JSONObject settings = this.getSettings();
            JSONObject contacts = settings.getJSONObject("contacts");
            JSONObject filtersettings = new JSONObject();
            String status = contacts.getString("status");
            Log.i("JSON PARSER", "status of contacts setting: " + status);
            if (status.equalsIgnoreCase("inherit")) {
                String categoryID = this.getCategoryId();
                Log.i("JSON PARSER", "inheriting settings from category id: " + categoryID);
                JSONObject categorySettings = this.getSettings(categoryID);
                JSONObject categorySettingsContacts = categorySettings.getJSONObject("contacts");
                filtersettings = categorySettingsContacts.getJSONObject("filterSettings");
                status = categorySettingsContacts.getString("status");
            } else {
                filtersettings = contacts.getJSONObject("filterSettings");
            }
            if (status.equalsIgnoreCase("blocked")) {
                return new JSONArray();
            } else if (status.equalsIgnoreCase("filtered")) {
//                filtersettings = contacts.getJSONObject("filterSettings");
            } else if (status.equalsIgnoreCase("enabled")) {
                JSONArray array = new JSONArray();
                JSONObject jo = new JSONObject();
                jo.put("status", "enabled");
                array.put(jo);
                return array;

            }

            Log.i("JSON PARSER", "filter settings: " + filtersettings.toString());
            if (type.equals("vertical")) {
                JSONArray vertical = filtersettings.getJSONArray("vertical");
                return vertical;
            } else if (type.equals("horizontal")) {
                JSONArray horizontal = filtersettings.getJSONArray("horizontal");
                return horizontal;

            } else {
                Log.i("JSON Parser", "Wrong usage of getContactsSettings");
                return null;
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return null;
    }

    public int getLocationRadius() {
        try {
            JSONObject settings = this.getSettings();
            JSONObject location = settings.getJSONObject("location");
            JSONObject filtersettings = location.getJSONObject("filterSettings");

            try {
                int radius = filtersettings.getInt("distance");
                return radius;
            } catch (NumberFormatException e) {
                e.printStackTrace();
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return 0;
    }

    /*
     * Utility function to check whether the JSON Array contains an element or not
     */
    public static boolean jSONArrayContains(JSONArray array, String element) throws JSONException {
        if (array.length() == 0) {
            return false;
        }
        for (int i = 0; i < array.length(); i++) {
            if (array.get(i).toString().equals(element)) {
                return true;
            }
        }
        return false;
    }

}
