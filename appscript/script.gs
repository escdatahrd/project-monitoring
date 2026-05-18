// ==========================================
// PROYEKAPP GOOGLE APPS SCRIPT - DYNAMIC PROJECT SETUP
// Replace your Apps Script Code.gs with this full file.
// Folder IDs are managed from the website Project Setup page.
// ==========================================

// Configuration is saved from the admin-only Project Setup page.
// Access control is handled by Firebase Auth/Firestore rules in the website.

// Default fallback config. These values keep the old project working before setup.html is saved.
var DEFAULT_PROJECT_CONFIG = {
  projectName: "Proyek Dashboard",
  mediaFolders: {
    photo: "1KbcOt7BcMbyFjyvTcAAmwA-oct_uFZm3",
    video: "1E4Qn1U0FF0RXIZzrD1_iky8ksF_kKDjk",
    sketchup: "",
  },
  reportFolders: {
    kontraktor: "1kelZSuQhXbIzVL_BiZAUMswgsrud2Aih",
  },
  documentFolders: {
    RKM: "1kelZSuQhXbIzVL_BiZAUMswgsrud2Aih",
    Administrasi: "1xGlov1yA9BJ_FWHmFM9hR9SBjJutn6DF",
    "Uji Mutu": "1IgsL99oKaAzhUkQQza8Tlv6YyvGFeu4q",
    "Checklist Bangunan Gedung": "1huVf3wVUz5n6by9Ixs0gWYB0JTCLxBZF",
    "Progress Material Approval": "1brs9bWgUu9dN6EJCi2jjERISjnK-kD49",
    "Progress Shop Drawing": "1S0ZcnJUrXivP-KAWXkHSlBNLVAmcZoDm",
    "LIst & Status RFI": "1ZDYGEej8KBDOMFUn-KRH5uRysZY9oG3h",
    "Progress MC-0": "1ULlb7FeRzKmU2EKWgOo8nmSbXompHEwB",
    Addendum: "1WgYwwIEcuddA_JnCvD5dLTqPqAF6p0Tp",
    "Progres Perhitungan TKDN": "1PQfinUP7qLp-oLYmv6jwRsmera7fzEqb",
    "HSE/K3": "1zVO6eS6YRz1ZLi4pZlvtsV99dpFaUUy7",
    "Laporan Evaluasi Kinerja": "1oMbnL2ijn_zPsR3meI_clgoD_YKbYH4L",
    Keuangan: "",
    "Dokumen Audit BPK": "",
  },
  documentCategories: [
    {
      id: "rkm",
      name: "RKM",
      badge: "RKM",
      color: "indigo",
      active: true,
      order: 1,
      folderId: "1kelZSuQhXbIzVL_BiZAUMswgsrud2Aih",
    },
    {
      id: "administrasi",
      name: "Administrasi",
      badge: "ADM",
      color: "blue",
      active: true,
      order: 2,
      folderId: "1xGlov1yA9BJ_FWHmFM9hR9SBjJutn6DF",
    },
    {
      id: "uji-mutu",
      name: "Uji Mutu",
      badge: "LAB",
      color: "teal",
      active: true,
      order: 3,
      folderId: "1IgsL99oKaAzhUkQQza8Tlv6YyvGFeu4q",
    },
    {
      id: "checklist-bangunan",
      name: "Checklist Bangunan Gedung",
      badge: "CHK",
      color: "slate",
      active: true,
      order: 4,
      folderId: "1huVf3wVUz5n6by9Ixs0gWYB0JTCLxBZF",
    },
    {
      id: "material-approval",
      name: "Progress Material Approval",
      badge: "MAT",
      color: "orange",
      active: true,
      order: 5,
      folderId: "1brs9bWgUu9dN6EJCi2jjERISjnK-kD49",
    },
    {
      id: "shop-drawing",
      name: "Progress Shop Drawing",
      badge: "DWG",
      color: "purple",
      active: true,
      order: 6,
      folderId: "1S0ZcnJUrXivP-KAWXkHSlBNLVAmcZoDm",
    },
    {
      id: "rfi",
      name: "LIst & Status RFI",
      badge: "RFI",
      color: "indigo",
      active: true,
      order: 7,
      folderId: "1ZDYGEej8KBDOMFUn-KRH5uRysZY9oG3h",
    },
    {
      id: "mc0",
      name: "Progress MC-0",
      badge: "MC",
      color: "emerald",
      active: true,
      order: 8,
      folderId: "1ULlb7FeRzKmU2EKWgOo8nmSbXompHEwB",
    },
    {
      id: "addendum",
      name: "Addendum",
      badge: "ADD",
      color: "slate",
      active: true,
      order: 9,
      folderId: "1WgYwwIEcuddA_JnCvD5dLTqPqAF6p0Tp",
    },
    {
      id: "tkdn",
      name: "Progres Perhitungan TKDN",
      badge: "TKDN",
      color: "sky",
      active: true,
      order: 10,
      folderId: "1PQfinUP7qLp-oLYmv6jwRsmera7fzEqb",
    },
    {
      id: "hse",
      name: "HSE/K3",
      badge: "K3",
      color: "red",
      active: true,
      order: 11,
      folderId: "1zVO6eS6YRz1ZLi4pZlvtsV99dpFaUUy7",
    },
    {
      id: "evaluasi",
      name: "Laporan Evaluasi Kinerja",
      badge: "EV",
      color: "slate",
      active: true,
      order: 12,
      folderId: "1oMbnL2ijn_zPsR3meI_clgoD_YKbYH4L",
    },
  ],
  // Mail folders are used only for opening Drive folders from the website.
  // They are intentionally excluded from action=syncFiles.
  mailFolders: {
    "Surat Masuk": "1vq2Dym38HL1EeCb5iOwMvVd0uULbWu3h",
    "Surat Keluar": "1n0YDLcd_wVe5eO6pKHKrYXskoX-u3e0s",
  },
};

var CONFIG_PROPERTY_KEY = "PROJECT_CONFIG_JSON";

// ==========================================
// ROUTER
// ==========================================

function doGet(e) {
  e = e || { parameter: {} };
  var action = e.parameter.action || "dashboard_init";
  var payload;

  try {
    if (action === "getConfig") {
      payload = {
        ok: true,
        config: getProjectConfig_(),
        mailFolderUrls: getMailFolderUrls_(getProjectConfig_()),
      };
      return output_(e, payload);
    }

    if (action === "saveConfig") {
      payload = saveConfigFromRequest_(e);
      return output_(e, payload);
    }

    if (action === "testConfig") {
      var cfg = e.parameter.config
        ? normalizeConfig_(JSON.parse(e.parameter.config))
        : getProjectConfig_();
      payload = testConfig_(cfg);
      return output_(e, payload);
    }

    if (action === "getMedia") {
      payload = getMediaData_(getProjectConfig_());
      return output_(e, payload);
    }

    if (action === "dashboard_init") {
      var cfgDash = getProjectConfig_();
      var photoId = cfgDash.mediaFolders.photo;
      var videoId = cfgDash.mediaFolders.video;
      payload = {
        ok: true,
        config: cfgDash,
        video: getLatestEmbedFile_(videoId, "video"),
        videos: getVideoObjectsFromFolder_(videoId),
        folders: getDateFolders(photoId),
      };
      return output_(e, payload);
    }

    if (action === "get_dashboard_photos") {
      var cfgPhotos = getProjectConfig_();
      var targetFolderId =
        extractFolderId_(e.parameter.folderId || "") ||
        cfgPhotos.mediaFolders.photo;
      payload = {
        ok: true,
        photos: getPhotoObjectsFromFolder_(targetFolderId, "Foto"),
      };
      return output_(e, payload);
    }

    if (action === "getReports") {
      var cfgReports = getProjectConfig_();
      var requestedRkmFolder = extractFolderId_(
        e.parameter.rkmFolderId || e.parameter.folderId || "",
      );
      var rkmFolder = requestedRkmFolder || getRkmReportFolderId_(cfgReports);
      payload = {
        ok: true,
        report_kontraktor: getLatestReport(rkmFolder),
        rkmFolderId: rkmFolder,
      };
      return output_(e, payload);
    }

    if (action === "syncFiles") {
      var cfgSync = getProjectConfig_();
      var allFiles = [];
      var folderMap = getDocumentFolderMap_(cfgSync);
      var syncedCategories = [];
      var folderErrors = [];

      for (var category in folderMap) {
        if (Object.prototype.hasOwnProperty.call(folderMap, category)) {
          // Surat is intentionally not synced into Register Surat.
          if (category === "Surat Masuk" || category === "Surat Keluar")
            continue;

          var folderId = extractFolderId_(folderMap[category]);
          if (isValidFolderId_(folderId)) {
            var result = getFilesInFolderResult_(folderId, category);
            if (result.error) {
              folderErrors.push({
                category: category,
                folderId: folderId,
                error: result.error,
              });
            } else {
              syncedCategories.push(category);
              allFiles = allFiles.concat(result.files);
            }
          }
        }
      }

      payload = {
        ok: true,
        status: "success",
        files: allFiles,
        syncedCategories: syncedCategories,
        folderErrors: folderErrors,
        configUpdatedAt: cfgSync.updatedAt || "",
      };
      return output_(e, payload);
    }

    if (action === "getMailFolders") {
      payload = {
        ok: true,
        folders: getMailFolderUrls_(getProjectConfig_()),
      };
      return output_(e, payload);
    }

    payload = { ok: false, error: "Unknown action: " + action };
    return output_(e, payload);
  } catch (err) {
    payload = {
      ok: false,
      error: err.toString(),
      stack: err.stack || "",
    };
    return output_(e, payload);
  }
}

function doPost(e) {
  e = e || {};
  try {
    var data =
      e.postData && e.postData.contents ? JSON.parse(e.postData.contents) : {};
    if (data.action === "saveConfig") {
      var cfg = normalizeConfig_(data.config || {});
      saveProjectConfig_(cfg);
      return ContentService.createTextOutput(
        JSON.stringify({ ok: true, config: cfg }),
      ).setMimeType(ContentService.MimeType.JSON);
    }
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: err.toString() }),
    ).setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, status: "success" }),
  ).setMimeType(ContentService.MimeType.JSON);
}

// ==========================================
// CONFIG MANAGEMENT
// ==========================================

function getProjectConfig_() {
  var props = PropertiesService.getScriptProperties();
  var raw = props.getProperty(CONFIG_PROPERTY_KEY);
  var stored = {};

  if (raw) {
    try {
      stored = JSON.parse(raw);
    } catch (err) {
      Logger.log("Config parse failed: " + err.toString());
    }
  }

  return normalizeConfig_(stored);
}

function saveProjectConfig_(config) {
  var cfg = normalizeConfig_(config || {});
  cfg.updatedAt = new Date().toISOString();
  PropertiesService.getScriptProperties().setProperty(
    CONFIG_PROPERTY_KEY,
    JSON.stringify(cfg),
  );
  return cfg;
}

function saveConfigFromRequest_(e) {
  if (!e.parameter.config) {
    return { ok: false, error: "Missing config parameter." };
  }

  var incoming = JSON.parse(e.parameter.config);
  var saved = saveProjectConfig_(incoming);

  return {
    ok: true,
    status: "saved",
    config: saved,
    mailFolderUrls: getMailFolderUrls_(saved),
  };
}

function normalizeConfig_(input) {
  var base = cloneObject_(DEFAULT_PROJECT_CONFIG);
  var cfg = mergeObject_(base, input || {});

  cfg.projectName = String(
    cfg.projectName || DEFAULT_PROJECT_CONFIG.projectName || "",
  ).trim();
  cfg.mediaFolders = normalizeFolderGroup_(cfg.mediaFolders || {});
  cfg.reportFolders = normalizeFolderGroup_(cfg.reportFolders || {});
  cfg.mailFolders = normalizeFolderGroup_(cfg.mailFolders || {});

  cfg.documentCategories = normalizeDocumentCategories_(
    cfg.documentCategories,
    cfg.documentFolders || {},
  );
  cfg.documentFolders = getDocumentFolderMap_(cfg);

  if (input && input.updatedAt) cfg.updatedAt = input.updatedAt;
  return cfg;
}

function normalizeDocumentCategories_(categories, fallbackMap) {
  var list = [];
  if (categories && Array.isArray(categories) && categories.length) {
    list = categories;
  } else {
    var map = fallbackMap || {};
    for (var name in map) {
      if (Object.prototype.hasOwnProperty.call(map, name)) {
        list.push({ name: name, folderId: map[name], active: true });
      }
    }
  }

  var out = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i] || {};
    var name = String(item.name || "").trim();
    if (!name) continue;
    var color = String(item.color || "slate").trim();
    var badge = String(item.badge || name.substring(0, 4).toUpperCase())
      .trim()
      .toUpperCase();
    out.push({
      id: String(item.id || slugify_(name)).trim(),
      name: name,
      badge: badge,
      color: color,
      active: item.active !== false,
      order: Number(item.order || i + 1),
      folderId: extractFolderId_(item.folderId || item.folderUrl || ""),
    });
  }

  out.sort(function (a, b) {
    return Number(a.order || 999) - Number(b.order || 999);
  });
  return out;
}

function getDocumentFolderMap_(cfg) {
  var out = {};
  var cats =
    cfg && cfg.documentCategories && Array.isArray(cfg.documentCategories)
      ? cfg.documentCategories
      : [];
  if (cats.length) {
    cats.forEach(function (cat) {
      if (cat && cat.name && cat.active !== false) {
        out[cat.name] = extractFolderId_(cat.folderId || cat.folderUrl || "");
      }
    });
    return out;
  }

  return normalizeFolderGroup_(
    cfg && cfg.documentFolders ? cfg.documentFolders : {},
  );
}

function slugify_(value) {
  return (
    String(value || "kategori")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "kategori"
  );
}

function normalizeFolderGroup_(group) {
  var out = {};
  for (var k in group) {
    if (Object.prototype.hasOwnProperty.call(group, k)) {
      out[k] = extractFolderId_(group[k]);
    }
  }
  return out;
}

function getMailFolderUrls_(cfg) {
  cfg = cfg || getProjectConfig_();
  var mail = cfg.mailFolders || {};
  return {
    suratMasuk: buildDriveFolderUrl_(mail["Surat Masuk"]),
    suratKeluar: buildDriveFolderUrl_(mail["Surat Keluar"]),
  };
}

function testConfig_(cfg) {
  cfg = normalizeConfig_(cfg || {});
  var checks = [];

  addFolderChecks_(checks, "Media / Foto", cfg.mediaFolders.photo);
  addFolderChecks_(checks, "Media / Video", cfg.mediaFolders.video);
  addFolderChecks_(checks, "Media / SketchUp", cfg.mediaFolders.sketchup);
  addFolderChecks_(checks, "Report / RKM", cfg.reportFolders.kontraktor);

  for (var docCat in cfg.documentFolders) {
    if (Object.prototype.hasOwnProperty.call(cfg.documentFolders, docCat)) {
      addFolderChecks_(
        checks,
        "Dokumen / " + docCat,
        cfg.documentFolders[docCat],
      );
    }
  }

  for (var mailCat in cfg.mailFolders) {
    if (Object.prototype.hasOwnProperty.call(cfg.mailFolders, mailCat)) {
      addFolderChecks_(checks, "Surat / " + mailCat, cfg.mailFolders[mailCat]);
    }
  }

  var validCount = 0;
  checks.forEach(function (item) {
    if (item.valid) validCount++;
  });

  return {
    ok: true,
    total: checks.length,
    valid: validCount,
    invalid: checks.length - validCount,
    checks: checks,
  };
}

function addFolderChecks_(checks, label, folderIdOrUrl) {
  var folderId = extractFolderId_(folderIdOrUrl);
  var item = {
    label: label,
    folderId: folderId || "",
    valid: false,
    name: "",
    error: "",
  };

  if (!folderId) {
    item.error = "Kosong / belum diisi";
    checks.push(item);
    return;
  }

  try {
    var folder = DriveApp.getFolderById(folderId);
    item.valid = true;
    item.name = folder.getName();
  } catch (err) {
    item.error = err.toString();
  }

  checks.push(item);
}

function cloneObject_(obj) {
  return JSON.parse(JSON.stringify(obj || {}));
}

function mergeObject_(base, override) {
  for (var key in override) {
    if (Object.prototype.hasOwnProperty.call(override, key)) {
      if (
        override[key] &&
        typeof override[key] === "object" &&
        !Array.isArray(override[key]) &&
        base[key] &&
        typeof base[key] === "object" &&
        !Array.isArray(base[key])
      ) {
        base[key] = mergeObject_(base[key], override[key]);
      } else {
        base[key] = override[key];
      }
    }
  }
  return base;
}

// ==========================================
// OUTPUT HELPER: JSON + JSONP
// ==========================================

function output_(e, payload) {
  var callback = e && e.parameter ? e.parameter.callback : null;
  var json = JSON.stringify(payload);

  if (callback) {
    if (
      !/^[a-zA-Z_$][0-9a-zA-Z_$]*(\.[a-zA-Z_$][0-9a-zA-Z_$]*)*$/.test(callback)
    ) {
      callback = "callback";
    }
    return ContentService.createTextOutput(
      callback + "(" + json + ");",
    ).setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService.createTextOutput(json).setMimeType(
    ContentService.MimeType.JSON,
  );
}

// ==========================================
// MEDIA DASHBOARD: FOTO, VIDEO, SKETCHUP
// ==========================================

function getMediaData_(cfg) {
  cfg = cfg || getProjectConfig_();
  var photos = getAllPhotoObjects_(cfg.mediaFolders.photo);
  var videos = getVideoObjectsFromFolder_(cfg.mediaFolders.video);
  var sketchup = getLatestAnyFileAsEmbed_(cfg.mediaFolders.sketchup);

  return {
    ok: true,
    photos: photos,
    videos: videos,
    video: videos.length ? videos[0] : null,
    sketchup: sketchup
      ? {
          id: sketchup.id,
          name: sketchup.name,
          embedUrl: sketchup.embedUrl,
          viewUrl: sketchup.viewUrl,
          thumbnailUrl: sketchup.thumbnailUrl,
          updated_at: sketchup.updated_at,
        }
      : null,
  };
}

function getAllPhotoObjects_(photoFolderId) {
  var result = [];
  var todayLabel =
    "Hari Ini (" + Utilities.formatDate(new Date(), "GMT+7", "dd MMM") + ")";
  result = result.concat(getPhotoObjectsFromFolder_(photoFolderId, todayLabel));

  try {
    if (!isValidFolderId_(photoFolderId)) return result;

    var parent = DriveApp.getFolderById(photoFolderId);
    var folders = parent.getFolders();
    var folderList = [];

    while (folders.hasNext()) {
      var f = folders.next();
      folderList.push({ id: f.getId(), name: f.getName() });
    }

    folderList.sort(function (a, b) {
      return b.name.localeCompare(a.name);
    });

    for (var i = 0; i < folderList.length; i++) {
      result = result.concat(
        getPhotoObjectsFromFolder_(folderList[i].id, folderList[i].name),
      );
    }
  } catch (err) {
    Logger.log("getAllPhotoObjects_ error: " + err.toString());
  }

  return result;
}

function getPhotoObjectsFromFolder_(folderId, folderLabel) {
  var list = [];
  if (!isValidFolderId_(folderId)) return list;

  try {
    var folder = DriveApp.getFolderById(folderId);
    var files = folder.getFiles();

    while (files.hasNext()) {
      var file = files.next();
      var mime = file.getMimeType();

      if (mime && mime.indexOf("image") > -1) {
        ensureAnyoneWithLink_(file);
        var id = file.getId();
        var name = file.getName();

        list.push({
          id: id,
          name: name,
          caption: name,
          folder: folderLabel || folder.getName(),
          url: "https://drive.google.com/thumbnail?id=" + id + "&sz=w1600",
          thumbnailUrl:
            "https://drive.google.com/thumbnail?id=" + id + "&sz=w800",
          imageUrl: "https://lh3.googleusercontent.com/d/" + id + "=w1600",
          viewUrl: file.getUrl(),
          created_at: safeIso_(file.getDateCreated()),
          updated_at: safeIso_(file.getLastUpdated()),
        });
      }
    }

    list.sort(function (a, b) {
      return String(b.updated_at).localeCompare(String(a.updated_at));
    });
  } catch (err) {
    Logger.log(
      "getPhotoObjectsFromFolder_ error for " +
        folderId +
        ": " +
        err.toString(),
    );
  }

  return list;
}

function getVideoObjectsFromFolder_(folderId) {
  var list = [];
  if (!isValidFolderId_(folderId)) return list;

  try {
    var folder = DriveApp.getFolderById(folderId);
    var files = folder.getFiles();

    while (files.hasNext()) {
      var file = files.next();
      var mime = file.getMimeType();

      if (mime && mime.indexOf("video") > -1) {
        ensureAnyoneWithLink_(file);
        var id = file.getId();
        var name = file.getName();

        list.push({
          id: id,
          name: name,
          embedUrl: "https://drive.google.com/file/d/" + id + "/preview",
          viewUrl: file.getUrl(),
          thumbnailUrl:
            "https://drive.google.com/thumbnail?id=" + id + "&sz=w800",
          created_at: safeIso_(file.getDateCreated()),
          updated_at: safeIso_(file.getLastUpdated()),
        });
      }
    }

    list.sort(function (a, b) {
      return String(b.updated_at).localeCompare(String(a.updated_at));
    });
  } catch (err) {
    Logger.log(
      "getVideoObjectsFromFolder_ error for " +
        folderId +
        ": " +
        err.toString(),
    );
  }

  return list;
}

function getLatestEmbedFile_(folderId, mimeKeyword) {
  if (!isValidFolderId_(folderId)) return null;

  try {
    var folder = DriveApp.getFolderById(folderId);
    var files = folder.getFiles();
    var latest = null;

    while (files.hasNext()) {
      var f = files.next();
      var mime = f.getMimeType();

      if (!mimeKeyword || (mime && mime.indexOf(mimeKeyword) > -1)) {
        if (!latest || f.getLastUpdated() > latest.getLastUpdated()) latest = f;
      }
    }

    if (!latest) return null;
    ensureAnyoneWithLink_(latest);

    return {
      id: latest.getId(),
      name: latest.getName(),
      embedUrl:
        "https://drive.google.com/file/d/" + latest.getId() + "/preview",
      viewUrl: latest.getUrl(),
      thumbnailUrl:
        "https://drive.google.com/thumbnail?id=" + latest.getId() + "&sz=w800",
      created_at: safeIso_(latest.getDateCreated()),
      updated_at: safeIso_(latest.getLastUpdated()),
    };
  } catch (err) {
    Logger.log(
      "getLatestEmbedFile_ error for " + folderId + ": " + err.toString(),
    );
    return null;
  }
}

function getLatestAnyFileAsEmbed_(folderId) {
  return getLatestEmbedFile_(folderId, null);
}

function ensureAnyoneWithLink_(file) {
  try {
    if (file.getSharingAccess() !== DriveApp.Access.ANYONE_WITH_LINK) {
      file.setSharing(
        DriveApp.Access.ANYONE_WITH_LINK,
        DriveApp.Permission.VIEW,
      );
    }
  } catch (err) {
    Logger.log("Sharing skipped for " + file.getName() + ": " + err.toString());
  }
}

// ==========================================
// AUTO ARCHIVE FOTO
// ==========================================

function autoArchivePhotos() {
  try {
    var cfg = getProjectConfig_();
    var photoFolderId = cfg.mediaFolders.photo;
    if (!isValidFolderId_(photoFolderId)) return;

    var rootFolder = DriveApp.getFolderById(photoFolderId);
    var filesToMove = [];
    var files = rootFolder.getFiles();

    while (files.hasNext()) {
      var file = files.next();
      if (file.getMimeType().indexOf("image") > -1) filesToMove.push(file);
    }

    if (filesToMove.length === 0) return;

    var todayStr = Utilities.formatDate(new Date(), "GMT+7", "yyyy-MM-dd");
    var targetFolder;
    var subFolders = rootFolder.getFoldersByName(todayStr);

    if (subFolders.hasNext()) targetFolder = subFolders.next();
    else targetFolder = rootFolder.createFolder(todayStr);

    for (var i = 0; i < filesToMove.length; i++)
      filesToMove[i].moveTo(targetFolder);

    Logger.log(
      "Sukses mengarsipkan " +
        filesToMove.length +
        " foto ke folder " +
        todayStr,
    );
  } catch (err) {
    Logger.log("Gagal Auto Archive: " + err.toString());
  }
}

// ==========================================
// DRIVE / DOCUMENT HELPERS
// ==========================================

function getDateFolders(parentId) {
  var list = [];
  if (!isValidFolderId_(parentId)) return list;

  var todayLabel =
    "Hari Ini (" + Utilities.formatDate(new Date(), "GMT+7", "dd MMM") + ")";
  list.push({ name: todayLabel, id: parentId });

  try {
    var parent = DriveApp.getFolderById(parentId);
    var folders = parent.getFolders();
    var subList = [];

    while (folders.hasNext()) {
      var f = folders.next();
      subList.push({ name: f.getName(), id: f.getId() });
    }

    subList.sort(function (a, b) {
      return b.name.localeCompare(a.name);
    });
    list = list.concat(subList);
  } catch (err) {
    Logger.log("getDateFolders error: " + err.toString());
  }

  return list;
}

function getFiles(folderId, type) {
  var list = [];
  if (!isValidFolderId_(folderId)) return list;

  try {
    var folder = DriveApp.getFolderById(folderId);
    var files = folder.getFiles();

    while (files.hasNext()) {
      var file = files.next();
      if (file.getMimeType().indexOf(type) > -1) {
        list.push(
          "https://drive.google.com/thumbnail?id=" + file.getId() + "&sz=w1000",
        );
      }
    }
  } catch (err) {
    Logger.log("getFiles error: " + err.toString());
  }

  return list;
}

function getLatestFile(folderId, type) {
  var latest = getLatestEmbedFile_(folderId, type);
  return latest ? latest.embedUrl : null;
}

function getRkmReportFolderId_(cfg) {
  cfg = cfg || getProjectConfig_();

  var fromReport = extractFolderId_(
    cfg.reportFolders && cfg.reportFolders.kontraktor
      ? cfg.reportFolders.kontraktor
      : "",
  );
  if (isValidFolderId_(fromReport)) return fromReport;

  var fromMap = extractFolderId_(
    cfg.documentFolders && cfg.documentFolders["RKM"]
      ? cfg.documentFolders["RKM"]
      : "",
  );
  if (isValidFolderId_(fromMap)) return fromMap;

  var cats =
    cfg.documentCategories && Array.isArray(cfg.documentCategories)
      ? cfg.documentCategories
      : [];
  for (var i = 0; i < cats.length; i++) {
    var cat = cats[i] || {};
    var name = String(cat.name || "").toLowerCase();
    var id = String(cat.id || "").toLowerCase();
    if (
      name === "rkm" ||
      name.indexOf("rapat kerja mingguan") > -1 ||
      id === "rkm"
    ) {
      var folderId = extractFolderId_(cat.folderId || cat.folderUrl || "");
      if (isValidFolderId_(folderId)) return folderId;
    }
  }

  return "";
}

function getLatestReport(folderId) {
  if (!isValidFolderId_(folderId)) return null;

  try {
    var folder = DriveApp.getFolderById(folderId);
    var files = folder.getFiles();
    var latest = null;

    while (files.hasNext()) {
      var f = files.next();

      // Untuk preview RKM, "terbaru" mengikuti file yang paling baru di-upload/dibuat
      // di folder Drive. Jika waktu upload sama, gunakan last updated sebagai tie-breaker.
      // Ini mencegah file lama yang pernah tersentuh permission/preview dianggap terbaru.
      if (!latest || isNewerDriveUpload_(f, latest)) latest = f;
    }

    if (latest) {
      ensureAnyoneWithLink_(latest);
      return {
        date: Utilities.formatDate(
          latest.getDateCreated(),
          "GMT+7",
          "dd MMM yyyy, HH.mm",
        ),
        embedUrl:
          "https://drive.google.com/file/d/" + latest.getId() + "/preview",
        viewUrl: latest.getUrl(),
        name: latest.getName(),
        id: latest.getId(),
        drive_created_at: safeIso_(latest.getDateCreated()),
        drive_updated_at: safeIso_(latest.getLastUpdated()),
        mime: latest.getMimeType(),
      };
    }
  } catch (err) {
    Logger.log("getLatestReport error: " + err.toString());
  }

  return null;
}

function isNewerDriveUpload_(candidate, current) {
  var candidateCreated = candidate.getDateCreated().getTime();
  var currentCreated = current.getDateCreated().getTime();
  if (candidateCreated !== currentCreated)
    return candidateCreated > currentCreated;

  var candidateUpdated = candidate.getLastUpdated().getTime();
  var currentUpdated = current.getLastUpdated().getTime();
  return candidateUpdated > currentUpdated;
}

function getFilesInFolderResult_(folderId, category) {
  var list = [];
  if (!isValidFolderId_(folderId)) {
    return { files: list, error: "Invalid folder ID" };
  }

  try {
    var folder = DriveApp.getFolderById(folderId);
    var files = folder.getFiles();

    while (files.hasNext()) {
      var f = files.next();
      list.push({
        id: f.getId(),
        title: f.getName(),
        category: category,
        url: f.getUrl(),
        created_at: safeIso_(f.getDateCreated()),
        updated_at: safeIso_(f.getLastUpdated()),
        drive_created_at: safeIso_(f.getDateCreated()),
        drive_updated_at: safeIso_(f.getLastUpdated()),
        mime: f.getMimeType(),
      });
    }

    list.sort(function (a, b) {
      var createdDiff = String(
        b.drive_created_at || b.created_at,
      ).localeCompare(String(a.drive_created_at || a.created_at));
      if (createdDiff !== 0) return createdDiff;
      return String(b.drive_updated_at || b.updated_at).localeCompare(
        String(a.drive_updated_at || a.updated_at),
      );
    });

    return { files: list, error: null };
  } catch (err) {
    Logger.log(
      "getFilesInFolder error for " + folderId + ": " + err.toString(),
    );
    return { files: list, error: err.toString() };
  }
}

// Backward-compatible wrapper for older calls, if any.
function getFilesInFolder(folderId, category) {
  return getFilesInFolderResult_(folderId, category).files;
}

// ==========================================
// DEBUGGING HELPERS
// ==========================================

function debugMediaFolders() {
  var cfg = getProjectConfig_();
  Logger.log("Project: " + cfg.projectName);
  Logger.log("PHOTO_FOLDER_ID = " + cfg.mediaFolders.photo);
  Logger.log("VIDEO_FOLDER_ID = " + cfg.mediaFolders.video);
  Logger.log("SKETCHUP_FOLDER_ID = " + cfg.mediaFolders.sketchup);

  debugFolder_("PHOTO", cfg.mediaFolders.photo);
  debugFolder_("VIDEO", cfg.mediaFolders.video);
  debugFolder_("SKETCHUP", cfg.mediaFolders.sketchup);
}

function debugFolder_(label, folderId) {
  Logger.log("---- " + label + " ----");

  if (!isValidFolderId_(folderId)) {
    Logger.log("Invalid or empty folder ID: " + folderId);
    return;
  }

  try {
    var folder = DriveApp.getFolderById(folderId);
    Logger.log("Folder name: " + folder.getName());

    var files = folder.getFiles();
    var count = 0;

    while (files.hasNext()) {
      var file = files.next();
      count++;
      Logger.log(
        count +
          ". " +
          file.getName() +
          " | MIME: " +
          file.getMimeType() +
          " | ID: " +
          file.getId() +
          " | Updated: " +
          safeIso_(file.getLastUpdated()),
      );
    }

    Logger.log("Total files in root folder: " + count);

    var folders = folder.getFolders();
    var subCount = 0;

    while (folders.hasNext()) {
      var sub = folders.next();
      subCount++;
      Logger.log("Subfolder: " + sub.getName() + " | ID: " + sub.getId());
    }

    Logger.log("Total subfolders: " + subCount);
  } catch (err) {
    Logger.log("ERROR: " + err.toString());
  }
}

// ==========================================
// SMALL UTILITIES
// ==========================================

function extractFolderId_(value) {
  if (!value) return "";
  var str = String(value).trim();
  if (
    !str ||
    str.indexOf("MASUKKAN_ID") !== -1 ||
    str.indexOf("ID_FOLDER") !== -1
  )
    return "";

  var patterns = [
    /\/folders\/([a-zA-Z0-9_-]+)/,
    /\/file\/d\/([a-zA-Z0-9_-]+)/,
    /[?&]id=([a-zA-Z0-9_-]+)/,
    /^([a-zA-Z0-9_-]{20,})$/,
  ];

  for (var i = 0; i < patterns.length; i++) {
    var m = patterns[i].exec(str);
    if (m && m[1]) return m[1];
  }

  return str;
}

function buildDriveFolderUrl_(folderId) {
  folderId = extractFolderId_(folderId);
  if (!isValidFolderId_(folderId)) return null;
  return "https://drive.google.com/drive/folders/" + folderId;
}

function isValidFolderId_(folderId) {
  folderId = extractFolderId_(folderId);
  return !!(folderId && typeof folderId === "string" && folderId.length > 20);
}

function safeIso_(dateObj) {
  try {
    return dateObj.toISOString();
  } catch (err) {
    return "";
  }
}
