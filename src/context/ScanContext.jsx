import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';

import { mockApi } from '../services/mockApi';


/* ============================================================
   CONTEXT
   ============================================================ */

const ScanContext =
  createContext(null);


/* ============================================================
   PROVIDER
   ============================================================ */

export const ScanProvider = ({
  children,
}) => {

  /* ==========================================================
     DATA STATE
     ========================================================== */

  const [
    scans,
    setScans,
  ] = useState([]);

  const [
    outbreaks,
    setOutbreaks,
  ] = useState([]);

  const [
    fieldVisits,
    setFieldVisits,
  ] = useState([]);


  /* ==========================================================
     LOADING / OPERATION STATE
     ========================================================== */

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    isScanning,
    setIsScanning,
  ] = useState(false);


  /* ==========================================================
     ERROR STATE
     ========================================================== */

  const [
    error,
    setError,
  ] = useState(null);

  const [
    scanError,
    setScanError,
  ] = useState(null);


  /* ==========================================================
     ACTIVE SCAN
     ========================================================== */

  const [
    activeScanResult,
    setActiveScanResult,
  ] = useState(null);


  /* ==========================================================
     REFRESH ALL DATA
     ========================================================== */

  const refreshAllData =
    useCallback(
      async () => {

        setIsLoading(true);

        setError(null);

        try {

          const [
            scansData,
            outbreaksData,
            visitsData,
          ] = await Promise.all([
            mockApi.getScans(),
            mockApi.getOutbreaks(),
            mockApi.getFieldVisits(),
          ]);


          setScans(
            Array.isArray(
              scansData
            )
              ? scansData
              : []
          );


          setOutbreaks(
            Array.isArray(
              outbreaksData
            )
              ? outbreaksData
              : []
          );


          setFieldVisits(
            Array.isArray(
              visitsData
            )
              ? visitsData
              : []
          );

        } catch (err) {

          console.error(
            'Failed to load initial mock data:',
            err
          );

          setError(
            err?.message ||
              'Failed to load application data.'
          );

        } finally {

          setIsLoading(false);

        }

      },
      []
    );


  /* ==========================================================
     INITIAL LOAD
     ========================================================== */

  useEffect(() => {

    refreshAllData();

  }, [
    refreshAllData,
  ]);


  /* ==========================================================
     RUN AI ANALYSIS
     ========================================================== */

  const runAiAnalysis =
    useCallback(
      async ({
        sampleKey,
        customImage,
        cropName,
        detectionType =
          'disease',
      }) => {

        /*
          Prevent duplicate requests.
        */

        if (isScanning) {
          return null;
        }


        setIsScanning(true);

        setScanError(null);

        setError(null);


        try {

          const result =
            await mockApi.analyzeLeafScan(
              {
                sampleKey,
                customImage,
                cropName,
                detectionType,
              }
            );


          if (!result) {

            throw new Error(
              'No analysis result was returned.'
            );

          }


          /*
            Set the active result immediately so
            the scanner UI can render it.
          */

          setActiveScanResult(
            result
          );


          /*
            Refresh the persistent scan history
            and related dashboard data after the
            analysis succeeds.
          */

          await refreshAllData();


          return result;

        } catch (err) {

          console.error(
            'AI scan failed:',
            err
          );


          setScanError(
            err?.message ||
              'The crop analysis could not be completed.'
          );


          /*
            Keep the previous active result from
            being displayed after a failed scan.
          */

          setActiveScanResult(
            null
          );


          throw err;

        } finally {

          setIsScanning(false);

        }

      },
      [
        isScanning,
        refreshAllData,
      ]
    );


  /* ==========================================================
     CLEAR ACTIVE SCAN
     ========================================================== */

  const clearActiveScanResult =
    useCallback(() => {

      setActiveScanResult(
        null
      );

      setScanError(
        null
      );

    }, []);


  /* ==========================================================
     VERIFY SCAN BY EXPERT
     ========================================================== */

  const verifyScanByExpert =
    useCallback(
      async (
        scanId,
        expertNotes,
        status
      ) => {

        try {

          setError(null);

          const updated =
            await mockApi.verifyScan(
              scanId,
              expertNotes,
              status
            );


          await refreshAllData();


          /*
            Keep the active result synchronized
            if the currently displayed scan was
            the one that got verified.
          */

          setActiveScanResult(
            (current) => {

              if (
                !current ||
                current.id !==
                  scanId
              ) {
                return current;
              }

              return {
                ...current,
                ...updated,
              };

            }
          );


          return updated;

        } catch (err) {

          console.error(
            'Failed to verify scan:',
            err
          );

          setError(
            err?.message ||
              'Failed to verify the scan.'
          );

          throw err;

        }

      },
      [
        refreshAllData,
      ]
    );


  /* ==========================================================
     CREATE OUTBREAK
     ========================================================== */

  const createNewOutbreak =
    useCallback(
      async (data) => {

        try {

          setError(null);

          const newOb =
            await mockApi.createOutbreak(
              data
            );


          await refreshAllData();


          return newOb;

        } catch (err) {

          console.error(
            'Failed to create outbreak:',
            err
          );

          setError(
            err?.message ||
              'Failed to create the outbreak.'
          );

          throw err;

        }

      },
      [
        refreshAllData,
      ]
    );


  /* ==========================================================
     SCHEDULE FIELD VISIT
     ========================================================== */

  const scheduleVisit =
    useCallback(
      async (
        visitData
      ) => {

        try {

          setError(null);

          const newVisit =
            await mockApi.createFieldVisit(
              visitData
            );


          await refreshAllData();


          return newVisit;

        } catch (err) {

          console.error(
            'Failed to schedule visit:',
            err
          );

          setError(
            err?.message ||
              'Failed to schedule the field visit.'
          );

          throw err;

        }

      },
      [
        refreshAllData,
      ]
    );


  /* ==========================================================
     CONTEXT VALUE
     ========================================================== */

  const contextValue = {
    /* ------------------------------------------
       Data
    ------------------------------------------- */

    scans,

    outbreaks,

    fieldVisits,


    /* ------------------------------------------
       Loading
    ------------------------------------------- */

    isLoading,

    isScanning,


    /* ------------------------------------------
       Errors
    ------------------------------------------- */

    error,

    scanError,


    /* ------------------------------------------
       Active Scan
    ------------------------------------------- */

    activeScanResult,

    setActiveScanResult,

    clearActiveScanResult,


    /* ------------------------------------------
       Operations
    ------------------------------------------- */

    runAiAnalysis,

    verifyScanByExpert,

    createNewOutbreak,

    scheduleVisit,


    /* ------------------------------------------
       Refresh
    ------------------------------------------- */

    refreshAllData,
  };


  return (
    <ScanContext.Provider
      value={
        contextValue
      }
    >
      {children}
    </ScanContext.Provider>
  );
};


/* ============================================================
   HOOK
   ============================================================ */

export const useScans = () => {

  const context =
    useContext(
      ScanContext
    );


  if (!context) {

    throw new Error(
      'useScans must be used inside a ScanProvider.'
    );

  }


  return context;
};