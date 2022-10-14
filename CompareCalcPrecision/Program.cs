using System;

namespace CompareCalcPrecision
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine(CalcCP64(164,164,146,13,3,7,0.6876849038));
            Console.WriteLine(CalcCP32(164,164,146,13,3,7,0.6876849038));
        }

        static float CalcCP64(int AtkBase, int DefBase, int StaBase, int AtkIv, int DefIv, int StaIv, double cpm)
        {
          int Atk = AtkBase + AtkIv;
          int Def = DefBase + DefIv;
          int Sta = StaBase + StaIv;

          double CP = (Atk * Math.Sqrt(Def) * Math.Sqrt(Sta) * Math.Pow(cpm, 2)) / 10; 
          
          return Math.Max(10, (int)CP);
        }
        static float CalcCP32(int AtkBase, int DefBase, int StaBase, int AtkIv, int DefIv, int StaIv, double cpm64)
        {
          float Atk = (float)(AtkBase + AtkIv);
          float Def = (float)(DefBase + DefIv);
          float Sta = (float)(StaBase + StaIv);
          float cpm = (float)(cpm64);

          float CP = (Atk * (float)Math.Sqrt(Def) * (float)Math.Sqrt(Sta) * (float)Math.Pow(cpm, 2)) / 10; 
          
          
          return Math.Max(10, (int)(CP));
        }
    }
}
